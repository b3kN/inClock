import Emitter  from './emitter';
import Handler  from './handler';

export interface IServerError {
  type: ServerError,
  from: number,
  data?: any
}

export enum ServerError {
  MongoConnectionFailure = 0x0
}
export namespace ServerError {

  export class ErrorHandler extends Handler {
    public id: string;
    public errorEmitter: ErrorEmitter;

    constructor(errorEmitter: ErrorEmitter) {
      super(errorEmitter);
      this.handlerConf();
    }

    private handlerConf() {
      for(let error in ServerError) {
        this.emitter.addListener(ServerError[error], (e, cb) => this.onHandle(e, cb));
      }
    }
  }

  export class ErrorEmitter extends Emitter {
    constructor() {
      super();
    }
  }
}
