import * as mongoose from 'mongoose';
import { IServerEvent, ServerEvent } from '../src/server/handlers/event.handler';
import { IServerError, ServerError } from '../src/server/handlers/error.handler';

export default function mongooseConf(ServerEventEmitter: ServerEvent.EventEmitter,
                                     ServerErrorEmitter: ServerError.ErrorEmitter) {
  let gracefulExit = function() {
    mongoose.connection.close(() => {
      let event: IServerEvent = {
        type: ServerEvent.MongoGracefulExit,
        from: process.pid
      };

      ServerEventEmitter.emit(event.type, event, () => {
        console.log(`(Process ${event.from}): Mongoose connection has disconnected through app termination`);
        process.exit(0);
      });
    });
  };

  mongoose.connection.on("connected", (ref) => {
    let event: IServerEvent = {
      type: ServerEvent.MongoConnection,
      from: process.pid
    };

    ServerEventEmitter.emit(event.type, event, () => {
      console.log(`Process ${event.from} successfully connected to ${process.env.NODE_ENV} database on startup`);
    });
  });
  
  mongoose.connection.on("error", (err) => {
    let error: IServerError = {
      type: ServerError.MongoConnectionFailure,
      from: process.pid
    };

    ServerErrorEmitter.emit(error.type, error, () => {
      console.error(`(Process ${error.from}): Failed to connect to ${process.env.NODE_ENV} database on startup!`);
      if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
        console.error('Error: ', err);
    });
  });
  
  mongoose.connection.on('disconnected', () => {
    let event: IServerEvent = {
      type: ServerEvent.MongoDisconnect,
      from: process.pid
    };

    ServerEventEmitter.emit(event.type, event, () => {
      console.log(`(Process ${event.from}): Mongoose default connection to ${process.env.NODE_ENV} database disconnected`);
    });
  });
  
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
  
  mongoose.connect(process.env.MONGO_URI, (error) => {

    if (error)
      throw error;
  });
};