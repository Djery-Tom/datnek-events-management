import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import {
  EventTypeEnum,
  EventInput,
  EventAction,
  EventOutput,
  EVENTS_STATE_NAME, DataService
} from '@datnek-events-management/events';
import { Store } from '@ngxs/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface SelectOption{
  label: string;
  value: string;
}

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule, FormlyModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit {

  private translateService = inject(TranslateService);
  private store = inject(Store);
  private activeModal = inject(NgbActiveModal);
  private dataService = inject(DataService);

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  // Event id on update
  @Input() eventId?: number;
  public $loading = signal(false);
  private $selectedEvent = toSignal<EventOutput.Get|undefined>(
    this.store
      .select((state) => state[EVENTS_STATE_NAME])
      .pipe(map((eventState) => eventState.selectedEvent))
  );

  fields: FormlyFieldConfig[] = [
    this.configCoverImageField(),
    this.configOrganizerField(),
    this.configEventNameField(),
    ...this.configEventTypeFields(),
    this.configStartDatesField(),
    this.configEndDatesField(),
    this.configDescriptionField(),
    this.configSpeakersField()
  ];

  private configCoverImageField(): FormlyFieldConfig {
    return {
      key: 'coverImage',
      type: 'cover-image-input',
      props: {
        required: true,
      },
      expressions: {
        'model.coverImage': (field: FormlyFieldConfig) => this.$selectedEvent()?.coverImage
      },
      validation: {
        messages: {
          required:  () => this.translateService.instant('errors.required_field'),
        },
      },
    };
  }

  private configOrganizerField(): FormlyFieldConfig {
    return {
      key: 'organizer',
      type: 'select',
      props: {
        required: true,
        options: this.dataService.getOrganizers().map(organizer => <SelectOption>{label: organizer, value: organizer}),
      },
      expressions: {
        'props.label': this.translateService.stream('form.organizer'),
        'model.organizer': (field: FormlyFieldConfig) =>  this.$selectedEvent()?.organizer
      },
      validation: {
        messages: {
          required: () => this.translateService.instant('errors.required_field'),
        },
      },
    };
  }

  private configEventNameField(): FormlyFieldConfig {
    return {
      key: 'eventName',
      type: 'input',
      props: {
        type: 'text',
        required: true,
      },
      expressions: {
        'props.label': this.translateService.stream('form.event_name'),
        'model.eventName': (field: FormlyFieldConfig) => this.$selectedEvent()?.eventName
      },
      validation: {
        messages: {
          required:  () => this.translateService.instant('errors.required_field'),
        },
      },
    };
  }

  private configEventTypeFields(): FormlyFieldConfig[] {
    return [
      {
        key: 'eventType',
        type: 'multicheckbox',
        props: {
          required: true,
          formCheck: "inline",
          options: [
            { label: this.translateService.instant('form.online'), value: EventTypeEnum.ONLINE },
            { label: this.translateService.instant('form.in_person'), value: EventTypeEnum.IN_PERSON },
          ],
        },
        expressions: {
          'props.label': this.translateService.stream('form.event_type'),
          'model.eventType': (field: FormlyFieldConfig) => JSON.parse(JSON.stringify({
            [EventTypeEnum.ONLINE] : this.$selectedEvent()?.isOnline(),
            [EventTypeEnum.IN_PERSON] : this.$selectedEvent()?.isInPerson()
          })),
        },
        validation: {
          messages: {
            required:  () => this.translateService.instant('errors.required_field'),
          },
        },
      },
      {
        key: 'eventUrl',
        type: 'input',
        props: {
          type: 'text',
          required: true,
          pattern: new RegExp(
            '^(https?:\\/\\/)([\\w\\-]+\\.)+[\\w]{2,}([\\/\\w\\-._~:/?#[\\]@!$&\'()*+,;=]*)?$'
          ),
          description: "Eg: https://example.com",
        },
        expressions: {
          'props.label': this.translateService.stream('form.event_url'),
          'model.eventUrl': (field: FormlyFieldConfig) => this.$selectedEvent()?.eventUrl,
          hide: (field: FormlyFieldConfig) => {
            const eventType = field.model?.eventType;
            return eventType ? !eventType[EventTypeEnum.ONLINE] : true;
          },
        },
        validation: {
          messages: {
            required:  () => this.translateService.instant('errors.required_field'),
            pattern:  () => this.translateService.instant('errors.invalid_url_format'),
          },
        },
      },
      {
        key: 'eventLocation',
        type: 'input',
        props: {
          type: 'text',
          required: true,
        },
        expressions: {
          'props.label': this.translateService.stream('form.event_location'),
          'model.eventLocation': (field: FormlyFieldConfig) => this.$selectedEvent()?.eventLocation,
          hide: (field: FormlyFieldConfig) => {
            const eventType = field.model?.eventType;
            return eventType ? !eventType[EventTypeEnum.IN_PERSON] : true;
          },
        },
        validation: {
          messages: {
            required:  () => this.translateService.instant('errors.required_field'),
          },
        },
      },
    ];
  }

  private configStartDatesField(): FormlyFieldConfig {
    return {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'startDate',
          type: 'input',
          props: {
            type: 'date',
            required: true,
          },
          expressions: {
            'props.label': this.translateService.stream('form.start_date'),
            'className': (field: FormlyFieldConfig) => field.model?.startDate ? 'col-6': 'col-12',
            'model.startDate': (field: FormlyFieldConfig) => this.$selectedEvent()?.startDate,
          },
          validation: {
            messages: {
              required:  () => this.translateService.instant('errors.required_field'),
            },
          },
        },
        {
          key: 'startTime',
          type: 'input',
          className: 'col-6',
          props: {
            type: 'time',
            required: true,
          },
          expressions: {
            'props.label': this.translateService.stream('form.start_time'),
            hide: '!model.startDate',
            'model.startTime': (field: FormlyFieldConfig) => this.$selectedEvent()?.startTime,
          },
          validation: {
            messages: {
              required:  () => this.translateService.instant('errors.required_field'),
            },
          },
        },
      ]
    };
  }

  private configEndDatesField(): FormlyFieldConfig {
    return {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          key: 'endDate',
          type: 'input',
          className: 'col-6',
          props: {
            type: 'date',
            required: true,
          },
          expressions: {
            'props.label': this.translateService.stream('form.end_date'),
            'props.min': 'model.startDate',
            'model.endDate': (field: FormlyFieldConfig) => this.$selectedEvent()?.endDate
          },
          validation: {
            messages: {
              required:  () => this.translateService.instant('errors.required_field'),
            },
          },
        },
        {
          key: 'endTime',
          type: 'input',
          className: 'col-6',
          props: {
            type: 'time',
            required: true,
          },
          expressions: {
            'props.label': this.translateService.stream('form.end_time'),
            'model.endTime': (field: FormlyFieldConfig) => this.$selectedEvent()?.endTime
          },
          validation: {
            messages: {
              required:  () => this.translateService.instant('errors.required_field'),
            },
          },
        },
      ],
      expressions: {
        hide: '!model.startDate',
      }
    };
  }

  private configDescriptionField(): FormlyFieldConfig {
    return {
      key: 'description',
      type: 'textarea',
      props: {
        required: true,
        rows: 5,
      },
      expressions: {
        'props.label': this.translateService.stream('form.description'),
        'model.description': (field: FormlyFieldConfig) => this.$selectedEvent()?.description

      },
      validation: {
        messages: {
          required:  () => this.translateService.instant('errors.required_field'),
        },
      },
    };
  }

  private configSpeakersField(): FormlyFieldConfig {
    return {
      key: 'speakers',
      type: 'speakers-input',
      className: 'mx-3',
      props: {
        required: true,
      },
      expressions: {
        'model.speakers': (field: FormlyFieldConfig) => this.$selectedEvent()?.speakers
      },
      validation: {
        messages: {
          required:  () => this.translateService.instant('errors.required_field'),
        },
      },
    };
  }


  onSubmit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const subscription$ = this.eventId ? this.store.dispatch(new EventAction.Edit(<EventInput.Update>{id: this.eventId, ...this.model}))
      : this.store.dispatch(new EventAction.Add(this.model as EventInput.Create));

    subscription$.subscribe({
      next: () => {
        // Refresh events if update is successful
        if(this.eventId){
          this.store.dispatch(EventAction.FetchAll);
        }

        this.resetForm(formDirective);
        this.closeModal();
      }
    });
  }

  private resetForm(formDirective: FormGroupDirective) {
    this.form.reset();
    formDirective.resetForm();
  }

  public closeModal() {
    this.activeModal.dismiss('Close');
  }

  ngOnInit(): void {
    // Fetch Event By Id when update
    if(this.eventId){
      this.$loading.set(true);
      this.store.dispatch(new EventAction.GetById(this.eventId)).subscribe({
        error: (err) => this.$loading.set(false),
        complete: () => this.$loading.set(false)
      });
    }
  }
}
