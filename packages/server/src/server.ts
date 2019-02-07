import express from 'express';
import socket from 'socket.io';
import { LoginHandler } from './handlers/LoginHandler';
import { LobbyHandler } from './handlers/LobbyHandler';

//
// Variables
//
const port = 5555;
const app: express.Express = express();

//
// Express setup
//
app.use(express.static('public'));

//
// Start the server
//
const server = app.listen(port, () => console.log(`[DEBUG] Server started on port ${port}.`));

//
// Socket setup
//
const io: socket.Server = socket(server);

//
// Socket connection
//

io.on('connection', (socket) => {
  console.log(`[${socket.client.id}] Connection established.`);

  //
  // Create handlers
  //
  const loginHandler = new LoginHandler(io, socket);
  const lobbyHandler = new LobbyHandler(io, socket);

  //
  // onDisconnect
  //
  socket.on('disconnect', () => {
    console.log(`[${socket.client.id}] Connection lost.`);

    loginHandler.onDisconnect();
  });
});
