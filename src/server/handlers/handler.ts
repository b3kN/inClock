const crypto = require('crypto');

import { ServerEvent, IServerEvent } from './event.handler';
import { IServerError, ServerError } from './error.handler';
import Emitter  from './emitter';

interface IHandler {
  id: string;
  emitter: Emitter;
}

export default class Handler implements IHandler {
  id: string;
  emitter: Emitter;

  constructor(emitter: Emitter) {
    this.id = this.generateHandlerId(7);
    this.emitter = emitter;
  }

  private generateHandlerId(length: number = 8) {
    return crypto.randomBytes(Math.ceil(length/2))
      .toString('hex')
      .slice(0, length);
  }

  protected onHandle(e: IServerEvent, cb: any) {
    if(cb)
      cb();
  }
}
