/// <reference path="_all.d.ts" />
'use strict';

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import { ServerEvent, IServerEvent } from './handlers/event.handler';
import { IServerError, ServerError } from './handlers/error.handler';
import mongooseConf from '../../config/mongoose.conf';
import routeConf from './routes';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

class Server {
  public app: express.Application;
  public eventEmitter: ServerEvent.EventEmitter;
  public eventHandlers: Array<ServerEvent.EventHandler>;
  public errorEmitter: ServerError.ErrorEmitter;
  public errorHandlers: Array<ServerError.ErrorHandler>;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.eventEmitter = new ServerEvent.EventEmitter();
    this.eventHandlers = [new ServerEvent.EventHandler(this.eventEmitter)];
    this.errorEmitter = new ServerError.ErrorEmitter();
    this.errorHandlers = [new ServerError.ErrorHandler(this.errorEmitter)];
    this.mongooseConf(this.eventEmitter, this.errorEmitter);
    this.config();
    this.routes(this.app, this.eventEmitter);
  }

  private mongooseConf(eventEmitter: ServerEvent.EventEmitter,
                     errorEmitter: ServerError.ErrorEmitter) {
    mongooseConf(eventEmitter, errorEmitter);
  }

  private config() {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(methodOverride('X-HTTP-Method-Override'));
    this.app.use(express.static(`${__dirname}/dist`));

    this.app.use(function(err: any,
                          req: express.Request,
                          res: express.Response,
                          next: express.NextFunction) {
      let error = new Error('Not Found');
      err.status = 404;
      next(err);
    });
  }

  private routes(app: express.Application,
                 passport: any,
                 ServerEventEmitter: ServerEvent.EventEmitter) {
    routeConf(app, ServerEventEmitter);
  }
}

let server = Server.bootstrap();
export = server.app;
