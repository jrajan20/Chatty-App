const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
 
wss.on('connection', (ws) => {

  console.log('Client connected');

//count clients connected
  function userCount(){
    let notification = {
      type:'usersNotification',
      content: wss.clients.size
    }
    
    broadcastBack(notification);
  }

  //random color generator
  let color = ['red','blue','green','orange','yellow','pink']
  let colorNum = Math.floor(Math.random()*color.length);
  
  //random color object
  let usercolors = {
          type: 'incomingColor',
          content: color[colorNum]
        }
  
  ws.on('message',(data) => {

    //send color of user to connected client
    ws.send(JSON.stringify(usercolors))
    
  	let message = JSON.parse(data);
    
    if (message.type === 'postMessage'){
      message.id = uuid();
      message.type = 'incomingMessage'
      broadcastBack(message);
    }
    if (message.type === 'postNotification'){
      message.type = 'incomingNotification'
      broadcastBack(message);
    }
    if (message.type === 'usersOnline'){
      userCount()
    }

  });

  //send message to all clients
  function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(message));
  });

}
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
  //updates user amount when client disconnects
    userCount();
  });
});