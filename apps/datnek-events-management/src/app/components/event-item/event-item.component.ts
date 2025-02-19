import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventOutput } from '@datnek-events-management/events';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {
  @Input() event!: EventOutput.Get;

  onDelete() {

  }

  onUpdate() {

  }
}
