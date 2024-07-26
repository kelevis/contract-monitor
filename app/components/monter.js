"use client";

import React, { useEffect, useState } from 'react';
import WebSocket from 'isomorphic-ws';

const USDTMonitor = () => {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTransfers((prevTransfers) => [data, ...prevTransfers]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">USDT Transfer Monitor</h1>
            {transfers.map((transfer, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                    <span>From: {transfer.from}</span>
                    <span>To: {transfer.to}</span>
                    <span>Value (Wei): {transfer.value}</span>
                </div>
            ))}
        </div>
    );
};

export default USDTMonitor;
