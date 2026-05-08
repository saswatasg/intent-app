const http = require('http');

const data = JSON.stringify({ userId: '11111111-1111-1111-1111-111111111111' });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/matchmaker',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => {
    body += d;
  });
  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
