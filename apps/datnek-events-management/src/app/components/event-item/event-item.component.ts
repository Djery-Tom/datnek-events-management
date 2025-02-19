import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventAction, EventOutput } from '@datnek-events-management/events';
import { TranslatePipe } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {

  private modalService = inject(NgbModal);

  @Input() event!: EventOutput.Get;

  onDelete() {

  }

  onUpdate() {
    const modalRef = this.modalService.open(EventFormComponent);
    modalRef.componentInstance.eventId = this.event.id;
  }
}
