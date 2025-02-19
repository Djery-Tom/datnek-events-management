import { EventInput } from '../../domain/dto';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventAction {

  export class Add {
    static readonly type = '[EventAction] Add';

    constructor(public event: EventInput.Create) {
    }
  }

  export class FetchAll {
    static readonly type = '[EventAction] Fetch All';
  }

}
