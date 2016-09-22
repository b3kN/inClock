import * as socketio from 'socket.io';
import socketBase from './sockets/base.socket';

const app = require('./app');
const debug = require('debug')('express:server');
const http = require('http');

const PORT = normalizePort(process.env.PORT) !== 'undefined' ?
                      normalizePort(process.env.PORT) : 3000;
app.set('port', PORT);

let server = http.createServer(app);
const SOCKET_PORT = normalizePort(process.env.SOCKET_PORT) !== 'undefined' ?
                      normalizePort(process.env.SOCKET_PORT) : 3001;

let io = socketio.listen(SOCKET_PORT);

socketBase(io);

server.listen(PORT);
server.on('error', onError.onError);
server.on('listening', onListening);

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.log(`VOICES IN YOUR HEAD COMING FROM ${bind}`);
  }
}
