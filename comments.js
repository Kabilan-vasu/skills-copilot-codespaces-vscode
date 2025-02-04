// Create web server
// Start server
// Listen for requests

const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  const method = req.method;

  if (path === '/' && method === 'GET') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      res.end(data);
    });
  } else if (path === '/comments' && method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('./comments.json', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      res.end(data);
    });
  } else if (path === '/comments' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const comment = JSON.parse(body);
      fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }

        const comments = JSON.parse(data);
        comments.push(comment);

        fs.writeFile('./comments.json', JSON.stringify(comments), err => {
          if (err) {
            res.statusCode = 500;
            res.end('Internal server error');
            return;
          }

          res.end('Comment added');
        });
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});