"use client";

import React, { useEffect, useState } from 'react';
import WebSocket from 'isomorphic-ws';

const USDTMonitor = () => {
    const [data, setDatas] = useState([]);

    const [transfers, setTransfers] = useState([]);
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('WebSocket Connected');
            socket.send('Hello, I am client!');
        };


        // WebSocket 接收到消息时的回调函数
        socket.onmessage = (event) => {
            console.log('Message from server :', event.data);
            const data = JSON.parse(event.data);

            console.log("data:",data)
            setTransfers(prevMessages => [...prevMessages, data]);


            // // 解析接收到的 JSON 消息
            // try {
            //     const data = JSON.parse(event.data);
            //     setTransfers(prevMessages => [...prevMessages, data]);
            //
            // } catch (error) {
            //     console.error('Failed to parse message:', error);
            // }
        };

        // WebSocket 发生错误时的回调函数
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };


        // WebSocket 连接关闭时的回调函数
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // 保存 WebSocket 对象
        setSocket(socket);


        return () => {
            socket.close();
        };
    }, []);


    return (
        <div>
            <h1>USDT Transfer Monitor</h1>
            {transfers.map((transfer, index) => (
                <div key={index}>
                    <p>From: {transfer.from}</p>
                    <p>To: {transfer.to}</p>
                    <p>Value (Wei): {transfer.value}</p>
                    <hr />
                </div>
            ))}




            {/*<ul>*/}
            {/*    {messages.map((message, index) => (*/}
            {/*        <li key={index}>*/}
            {/*            <strong>Type:</strong> {message.type} <br/>*/}
            {/*            <strong>Content:</strong> {message.content}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
};

export default USDTMonitor;
