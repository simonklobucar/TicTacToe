const path = require('path');
const socketIo = require('socket.io');
const express = require('express');

const app = express();
const server = require('http').Server(app); // Create the HTTP server using Express app
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Array to store active connections
const activeConnections = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    activeConnections.push(socket);

    // Handle incoming messages from clients
    socket.on('message', (data) => {
        console.log('Received message:', data);
        // Handle the received data as needed
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Remove the disconnected socket from the activeConnections array
        const index = activeConnections.indexOf(socket);
        if (index !== -1) {
            activeConnections.splice(index, 1);
        }
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist/')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
