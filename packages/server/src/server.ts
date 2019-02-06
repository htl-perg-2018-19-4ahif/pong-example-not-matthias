import express from 'express';
import socket from 'socket.io';

//
// Variables
//
const port = 5555;
const app = express();

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
const io = socket(server);

//
// Socket connection
//
io.on('connection', (socket) => {
  console.log(`[DEBUG] Connection established with client ${socket.client.id}.`);

  // TODO: add socket handlers here
});
