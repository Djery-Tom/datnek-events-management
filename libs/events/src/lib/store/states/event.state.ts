import {State, StateContext, Action} from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";


import { EventAction } from '../actions';
import { EventOutput } from '../../domain/dto';
import { EventService } from '../../application/services';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EVENTS_STATE_NAME } from '../../domain/constants';


interface EventStateModel {
  events: EventOutput.Get[]
}

@State<EventStateModel>({
  name: EVENTS_STATE_NAME,
  defaults: {
    events: []
  }
})
@Injectable()
export class EventState {

  private eventService = inject(EventService);
  private toastService= inject(ToastrService);
  private translateService= inject(TranslateService);


  @Action(EventAction.Add)
  createEvent({patchState, getState}: StateContext<EventStateModel>, {event}: EventAction.Add): Observable<EventOutput.Create> {
     const {events} = getState();
    return this.eventService.createEvent(event)
      .pipe(
        map((eventCreated) => {

          patchState({
            events: [...events, Object.assign(new EventOutput.Get() , eventCreated)]
          })

          this.toastService.success(this.translateService.instant('toast.success_message'));

          return eventCreated;
        })
      );
  }

  @Action(EventAction.FetchAll)
  fetchAllEvents({patchState}: StateContext<EventStateModel>): Observable<EventOutput.Get[]> {

    return this.eventService.getEvents()
      .pipe(
        map((events) => {

          events = events.map(e => Object.assign(new EventOutput.Get(), e));

          patchState({
            events: events
          })

          return events;
        })
      );
  }

}
