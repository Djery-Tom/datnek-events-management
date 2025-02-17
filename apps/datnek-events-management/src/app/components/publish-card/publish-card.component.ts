import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EventModalComponent } from '../event-modal/event-modal.component';

@Component({
  selector: 'app-publish-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe, EventModalComponent],
  templateUrl: './publish-card.component.html',
  styleUrl: './publish-card.component.css',
})
export class PublishCardComponent {}
