import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { EventAction, EventOutput, EVENTS_STATE_NAME } from '@datnek-events-management/events';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventItemComponent } from '../event-item/event-item.component';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, EventItemComponent, TranslatePipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
  private store = inject(Store);

  public $events = toSignal<EventOutput.Get[]>(
    this.store
      .select((state) => state[EVENTS_STATE_NAME])
      .pipe(map((eventState) => eventState.events))
  );

  ngOnInit(): void {
    this.store.dispatch(EventAction.FetchAll);
  }
}
