// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventOutput {

  export interface Create {
    id: number
    coverImage: string;
    organizerId: number;
    eventUrl?: string;
    eventLocation?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
  }

  export class Get {
    id = 0;
    coverImage = '';
    organizerId = 0;
    eventUrl?: string;
    eventLocation?: string;
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

}
