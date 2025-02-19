import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { EventTypeEnum, EventInput , EventAction } from '@datnek-events-management/events';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ReactiveFormsModule, FormlyModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  private translateService = inject(TranslateService);
  private store = inject(Store);


  fields: FormlyFieldConfig[] = [
    this.configCoverImageField(),
    this.configOrganizerField(),
    this.configEventNameField(),
    ...this.configEventTypeFields(),
    this.configStartDatesField(),
    this.configEndDatesField(),
    this.configDescriptionField(),
  ];

  private configCoverImageField(): FormlyFieldConfig {
    return {
      key: 'coverImage',
      type: 'cover-image-input',
      props: {
        required: true,
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
        options: [
          { label: 'Djery DIETCHI', value: 'Djery DIETCHI' },
          { label: 'Danick Takam', value: 'Danick Takam' },
        ],
      },
      expressions: {
        'props.label': this.translateService.stream('form.organizer'),
      },
      validation: {
        messages: {
          required:  () => this.translateService.instant('errors.required_field'),
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
            { label: this.translateService.instant('form.in_person'), value:  EventTypeEnum.IN_PERSON },
          ],
        },
        expressions: {
          'props.label': this.translateService.stream('form.event_type'),
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
          pattern: '^(https?:\\/\\/)?([\\w\\-]+\\.)+[\\w]{2,}(\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]*)?$',
          description: "Eg: https://example.com",
        },
        expressions: {
          'props.label': this.translateService.stream('form.event_url'),
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

    this.store.dispatch(new EventAction.Add(this.model as EventInput.Create)).subscribe({
      next: () => {
        this.closeModal();
        this.resetForm(formDirective);
      }
    });
  }

  private resetForm(formDirective: FormGroupDirective) {
    this.form.reset();
    formDirective.resetForm();
  }

  private closeModal() {
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}
