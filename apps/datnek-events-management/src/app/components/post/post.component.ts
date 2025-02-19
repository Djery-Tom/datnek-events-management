import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private modalService = inject(NgbModal);

  openEventModal() {
    this.modalService.open(EventFormComponent);
  }
}
