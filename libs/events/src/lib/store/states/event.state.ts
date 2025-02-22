import {State, StateContext, Action} from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";


import { EventAction } from '../actions';
import { EventOutput , EVENTS_STATE_NAME } from '../../domain';
import { EventService } from '../../application';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


interface EventStateModel {
  events: EventOutput.Get[],
  selectedEvent?: EventOutput.Get,
}

@State<EventStateModel>({
  name: EVENTS_STATE_NAME,
  defaults: {
    events: [],
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
            events: [Object.assign(new EventOutput.Get() , eventCreated), ...events]
          });

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
          });

          return events;
        })
      );
  }

  @Action(EventAction.GetById)
  getEventById({patchState}: StateContext<EventStateModel>, {id}: EventAction.GetById): Observable<EventOutput.Get|undefined> {
    return this.eventService.getEventById(id)
      .pipe(
        map((event) => {
          patchState({
            selectedEvent: Object.assign(new EventOutput.Get(), event)
          });
          return event;
        })
      );
  }


  @Action(EventAction.Edit)
  updateEvent({patchState}: StateContext<EventStateModel>, {event}: EventAction.Edit): Observable<EventOutput.Update> {
    return this.eventService.updateEvent(event)
      .pipe(
        map((eventUpdated) => {
          this.toastService.success(this.translateService.instant('toast.success_message'));
          return eventUpdated;
        })
      );
  }

  @Action(EventAction.Delete)
  deleteEvent({patchState, getState}: StateContext<EventStateModel>, {id}: EventAction.Delete): Observable<EventOutput.Delete> {

    const {events} = getState();

    return this.eventService.deleteEvent(id)
      .pipe(
        map((event) => {
          patchState({
            events: events.filter(e => e.id !== id)
          });

          return event;
        })
      );
  }

}
