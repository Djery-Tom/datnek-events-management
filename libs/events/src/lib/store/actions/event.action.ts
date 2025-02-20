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

  export class GetById {
    static readonly type = '[EventAction] Get By Id';

    constructor(public id: number) {
    }
  }

  export class Edit {
    static readonly type = '[EventAction] Edit';

    constructor(public event: EventInput.Update) {
    }
  }

}
