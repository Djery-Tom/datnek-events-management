// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventInput {

  export interface Create {
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

}
