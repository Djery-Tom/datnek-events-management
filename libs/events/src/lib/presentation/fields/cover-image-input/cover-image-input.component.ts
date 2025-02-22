import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-events-cover-image-input',
  standalone: true,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './cover-image-input.component.html',
  styleUrl: './cover-image-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoverImageInputComponent extends FieldType<FieldTypeConfig> implements OnInit {
  public $previewUrl = signal<string | undefined>(undefined);

  // Image Preview
  showPreview(event: Event): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = (<FileReader>event.target).result as string;
        this.$previewUrl.set(base64Image);

        // Use base64Image as value of formControl
        this.formControl.setValue(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  formControlHasError(): boolean {
    return this.formControl.touched && this.formControl.hasError('required');
  }

  ngOnInit(): void {
    this.$previewUrl.set(this.formControl.value)
  }
}
