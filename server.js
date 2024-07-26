const { ethers } = require('ethers');
const WebSocket = require('ws');

const contractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
];

const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/3BTT655Z0kgn8kQb4b7Sqo9CvhvbUf7Q");
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);

const PORT = process.env.WS_PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    contractUSDT.on('Transfer', (from, to, value) => {
        console.log(`监控币安USDT合约: from: ${from} -> to: ${to} Value: ${value} ether`);

        let from1 = from.toString();
        let to1 = to.toString();
        let value1 = value.toString();
        ws.send(JSON.stringify({ from: from1, to: to1, value: value1 }));
        console.log("已发送");
    });
});

console.log(`WebSocket server started on ws://localhost:${PORT}`);
