import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventOutput, EventInput } from '../../domain/dto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // URL to events resources in-memory api
  private eventsUrl = 'api/events';

  constructor(private http: HttpClient) { }

  createEvent(event: EventInput.Create): Observable<EventOutput.Create> {
    return this.http.post<EventOutput.Create>(this.eventsUrl, event);
  }

  getEvents(): Observable<EventOutput.Get[]> {
    return this.http.get<EventOutput.Get[]>(this.eventsUrl);
  }


}
