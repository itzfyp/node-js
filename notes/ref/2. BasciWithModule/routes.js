const fs = require('fs');

const requestHandler = (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  const setTitle = (title = 'Node App') => `<title>${title}</title>`;
  const setContent = (content = 'Welcome') => `<main>${content}</main>`;

  let title = setTitle();
  let content = setContent();

  const url = req.url;
  const method = req.method;

  if (url === '/') {
    title = setTitle('Enter Message');
    content = setContent(
      `
      <form action="/message" method="POST">
        <input type="text" name="message"/>
        <button type="submit">send</button>
      </form>
      `
    );
  }

  if (url === '/message' && method === 'POST') {

    const body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });

    });


  }

  res.write(
    `<html>
        <head>
            ${title}
        </head>
        <body>
            ${content}
        </body>
    </html>
    `
  );

  res.end();
};

module.exports = requestHandler;
