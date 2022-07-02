const http = require("http");
const fs = require('fs');
const path = require('path');
const getNpmData = require('./puppeteer');

http.createServer(async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json;');
  res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  console.log(req.url);
  console.log(req.method);
  if (req.method == 'OPTIONS') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
    });
    res.end('');
  }

  if (req.method === 'POST' && req.url === '/api/getInfo') {
    let item = '';
    req.on('data', function (chunk) {
      item += chunk.toString();
    });
    req.on('end', async () => {
      let items = JSON.parse(item)
      let npmInfo = await getNpmData(items.name)
      res.write(JSON.stringify(npmInfo));
      res.end();
    });
  }

}).listen(3001); // 监听的端口
