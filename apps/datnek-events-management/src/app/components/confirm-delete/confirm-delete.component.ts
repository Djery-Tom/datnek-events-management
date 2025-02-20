import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventAction, EventInput } from '@datnek-events-management/events';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
})
export class ConfirmDeleteComponent {

  private activeModal = inject(NgbActiveModal);
  private store = inject(Store);

  @Input() event?: EventInput.Delete;

  public closeModal() {
    this.activeModal.dismiss('Close');
  }

  onDelete() {
    if(this.event) {
      this.store.dispatch(new EventAction.Delete(this.event?.id));
    }

    this.closeModal();
  }
}
