"use client";

import React, { useEffect, useState } from 'react';
import WebSocket from 'isomorphic-ws';

const USDTMonitor = () => {
    const [data, setDatas] = useState([]);

    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:8080');
    //
    //     ws.onopen = () => {
    //         console.log('WebSocket connection opened');
    //     };
    //
    //     ws.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         setTransfers((prevTransfers) => [data, ...prevTransfers]);
    //     };
    //
    //     ws.onclose = () => {
    //         console.log('WebSocket connection closed');
    //     };
    //
    //     return () => {
    //         ws.close();
    //     };
    // }, []);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('WebSocket Connected');
            socket.send('Hello, I am client!');
        };

        socket.onmessage = (event) => {
            console.log('Message from server ', event.data);
                    // const data = JSON.parse(event.data);
                    setMessages(prevMessages => [...prevMessages, event.data]);
        };

        return () => {
            socket.close();
        };
    }, []);


    return (
        <div>
            <h1>USDT Transfer Monitor</h1>
                <div >
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}

                    <hr />
                </div>
        </div>
    );
};

export default USDTMonitor;
