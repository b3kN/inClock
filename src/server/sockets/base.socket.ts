export default (io) => {
  io.sockets.on('connect', (socket: any) => {
    let handle: any = 'unknown';
    console.log(`{ socket } [client:connect] ${ handle } client connected`);
    socket.on('disconnect', () => {
      console.log(`{ socket } [client:disconnect] ${ handle } disconnected`);
      io.emit('chat:message', `{ socket } ${ handle } has left the channel`);
    });
    socket.on('chat:message', (message: any) => {
      io.emit('chat:message;', `${ handle } : ${ message }`);
      console.log(`{ socket } [chat:message] ${ handle } : ${ message }`);
    });
    socket.on('chat:register', (input: any) => {
      handle = input;
      console.log(`{ socket } [client:register] ${ handle } : has registered with the server`);
      io.emit('chat:message', `{ socket } ${ handle } has joined the channel`);
    })
  })
}
