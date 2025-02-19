// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventInput {

  export interface Create {
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

  export interface Update {
    id: number;
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

}
