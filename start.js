// start.js
const { exec } = require('child_process');

// 启动 Next.js 应用
const nextProcess = exec('next start', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting Next.js: ${err}`);
        return;
    }
    console.log(`Next.js output: ${stdout}`);
    console.error(`Next.js error output: ${stderr}`);
});

// 启动 WebSocket 服务器
const wsProcess = exec('node server.js', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting WebSocket server: ${err}`);
        return;
    }
    console.log(`WebSocket server output: ${stdout}`);
    console.error(`WebSocket server error output: ${stderr}`);
});

// 监听子进程输出
nextProcess.stdout.on('data', (data) => {
    console.log(`Next.js: ${data}`);
});
nextProcess.stderr.on('data', (data) => {
    console.error(`Next.js error: ${data}`);
});

wsProcess.stdout.on('data', (data) => {
    console.log(`WebSocket server: ${data}`);
});
wsProcess.stderr.on('data', (data) => {
    console.error(`WebSocket server error: ${data}`);
});
