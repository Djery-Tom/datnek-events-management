import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lib-events-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public translateService = inject(TranslateService);

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
