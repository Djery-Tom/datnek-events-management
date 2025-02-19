import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cover-image-input',
  standalone: true,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './cover-image-input.component.html',
  styleUrl: './cover-image-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoverImageInputComponent extends FieldType<FieldTypeConfig> {
  public $previewUrl = signal<string | undefined>(undefined);

  // Image Preview
  showPreview(event: Event) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.$previewUrl.set((<FileReader>event.target).result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
