// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventOutput {

  export interface Create {
    id: number
    coverImage: string;
    organizer: string;
    eventUrl?: string;
    eventLocation?: string;
    eventName: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
  }

  export class Get {
    id = 0;
    coverImage = '';
    organizer = '';
    eventUrl?: string;
    eventLocation?: string;
    eventName = '';
    startDate = '';
    startTime = '';
    endDate = '';
    endTime = '';
    description = '';

    isOnline() {
      return this.eventUrl !== undefined;
    }

    isInPerson() {
      return this.eventLocation !== undefined;
    }
  }

  export interface Update {
    id: number
    coverImage: string;
    organizer: string;
    eventUrl?: string;
    eventLocation?: string;
    eventName: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
  }

  export interface Delete {
    id: number
  }


}
