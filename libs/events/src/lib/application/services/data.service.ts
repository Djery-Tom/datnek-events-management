import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getOrganizers(): string[] {
    return [
      'Djery DIETCHI',
      'Danick Takam'
    ];
  }

  getSpeakers(): string[] {
    return [
      'John Doe',
      'Boris Gate',
      'Jessica Amber',
      'Lucas Modric'
    ];
  }


}
