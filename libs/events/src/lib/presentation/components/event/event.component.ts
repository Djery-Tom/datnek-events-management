import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventItemComponent } from '../event-item/event-item.component';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { EventOutput, EVENTS_STATE_NAME } from '../../../domain';
import { EventAction } from '../../../store';

@Component({
  selector: 'lib-events-event',
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
