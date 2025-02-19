import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventOutput } from '@datnek-events-management/events';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {

  @Input() event!: EventOutput.Get;
}
