import React, { useEffect} from 'react';
import TicTacToe from "./js/components/TicTacToe"

import io from 'socket.io-client';

import './scss/all.scss';

const App = () => {
    useEffect(() => {
        const socket = io('http://localhost:3000');

        // Handle incoming messages from the server
        socket.on('message', (data) => {
            console.log('Received message from server:', data);
            // Handle the received data as needed
        });

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <h1 className="title">TIC TAC TOE</h1>
            <TicTacToe />
        </>

    );
};
export default App;
