import Emitter  from './emitter';
import Handler  from './handler';

export interface IServerEvent {
  type: ServerEvent,
  from: number,
  data?: any
}

export enum ServerEvent {
  Generic = 0x0,
  NotifyRequest = 0x1,
  MongoConnection = 0x2,
  MongoDisconnect = 0x4,
  MongoGracefulExit = 0x8
}

export namespace ServerEvent {

  export class EventHandler extends Handler {
    public id: string;
    public eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
      super(eventEmitter);
      this.handlerConf();
    }

    private handlerConf() {
      for(let event in ServerEvent) {
        this.emitter.addListener(ServerEvent[event], (e, cb) => this.onHandle(e, cb));
      }
    }
  }

  export class EventEmitter extends Emitter {
    constructor() {
      super();
    }
  }
}
