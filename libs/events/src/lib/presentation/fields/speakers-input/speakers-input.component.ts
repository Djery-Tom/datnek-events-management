import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { debounceTime, map, Observable, OperatorFunction } from 'rxjs';
import { DataService } from '../../../application';

@Component({
  selector: 'lib-events-speakers-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    NgbTypeahead,
    TranslatePipe,
    FormsModule,
  ],
  templateUrl: './speakers-input.component.html',
  styleUrl: './speakers-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeakersInputComponent extends FieldType<FieldTypeConfig> implements OnInit {

  private dataService = inject(DataService);
  public $selectedSpeakers = signal<string[]>([]);

  constructor() {
    super();

    if(this.formControl?.value) {
      this.$selectedSpeakers.set(this.formControl.value as string[])
    }

    // Automatically bind selected speakers to formControl value
    effect(() => {
      this.formControl.setValue(this.$selectedSpeakers());
    });
  }

  ngOnInit(): void {
    if(this.formControl.value) {
      this.$selectedSpeakers.set(this.formControl.value as string[])
    }
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.dataService
              .getSpeakers()
              .filter(speaker => !this.$selectedSpeakers().includes(speaker))
              .filter(
                (speaker) =>
                  speaker.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (speaker: string) => '';


  onSelect(event: NgbTypeaheadSelectItemEvent<string>) {
    this.$selectedSpeakers.update((speakers) => [...speakers, event.item]);
  }

  removeSpeaker(speaker: string) {
    this.$selectedSpeakers.update((speakers) => speakers.filter(s => s !== speaker));
  }

  formControlHasError(): boolean {
    return this.formControl.touched && this.formControl.hasError('required');
  }
}
