// app/api/transfers/route.ts
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
];

const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/3BTT655Z0kgn8kQb4b7Sqo9CvhvbUf7Q");
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

let latestTransfers: { from: string, to: string, value: string }[] = [];

contractUSDT.on('Transfer', (from, to, value) => {
    console.log(`监控币安USDT合约: from: ${from} -> to: ${to} Value: ${value} ether`);

    latestTransfers.unshift({ from, to, value: value.toString() });
    if (latestTransfers.length > 5) latestTransfers.pop();  // Keep only the latest 10 transfers
});

export async function GET() {
    return NextResponse.json(latestTransfers);
}
