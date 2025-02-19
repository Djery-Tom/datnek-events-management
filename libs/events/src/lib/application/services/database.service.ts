import { InMemoryDbService} from 'angular-in-memory-web-api';
import { EventOutput } from '../../domain/dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements InMemoryDbService {

  private events: EventOutput.Get[] = [];

  createDb() {
    return {events : this.events};
  }

  // Generate the id of new event when create
  genId(events: EventOutput.Get[]): number {
    return events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
  }

}
