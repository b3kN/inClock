import * as express from 'express';
import * as userRouter from "./routes/_user.router";
import { ServerEvent, IServerEvent } from './handlers/event.handler';

export default (app: express.Application,
                passport: any,
                ServerEventEmitter: ServerEvent.EventEmitter) => {

  let router: express.Router;
  
  router = express.Router();
  
  let numReqs: number = 0;
  
  router.use((req: express.Request,
              res: express.Response,
              next: express.NextFunction) => {
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      let event: IServerEvent = {
        type: ServerEvent.NotifyRequest,
        from: process.pid
      };
      ServerEventEmitter.emit(event.type, event, () => {
        numReqs++;
        console.log('I CAN HEAR THINGS!?');
        console.log(`{${event.from}} - requests served since last restart: ${numReqs}`);
      });
    }
    next();
  });

  let userRoutes: userRouter.Routes = new userRouter.Routes(this.app, router);
  
  app.use('/api', router);
  app.use(express.static('dist/client'));
  
  app.get('*', (req, res) => {
    res.sendFile('/dist/client/index.html', { root: __dirname + "/../../"});
  });
  
  app.use(router);
};