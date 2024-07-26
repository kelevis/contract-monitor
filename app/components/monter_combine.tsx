// pages/index.tsx
"use client"
import React, { useEffect, useState } from 'react';

interface Transfer {
    from: string;
    to: string;
    value: string;
}

const USDTMonitor: React.FC = () => {
    const [transfers, setTransfers] = useState<Transfer[]>([]);

    const fetchTransfers = async () => {
        try {
            const response = await fetch('/api/transfers');
            const data: Transfer[] = await response.json();
            setTransfers(data);
        } catch (error) {
            console.error('Error fetching transfers:', error);
        }
    };

    useEffect(() => {
        // Fetch initial transfers
        fetchTransfers();

        // Set up interval to fetch transfers every 10 seconds
        const interval = setInterval(fetchTransfers, 1000);

        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-fuchsia-200 font-bold mb-4">USDT Transfer Monitor</h1>
            {transfers.map((transfer, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                    <span className="font-bold">From: {transfer.from}</span>
                    <span className="font-bold">To: {transfer.to}</span>
                    <span className="font-bold">Value-Wei: </span>{transfer.value}
                </div>
            ))}
        </div>
    );
};

export default USDTMonitor;
