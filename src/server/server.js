import express from 'express';

const app = express();

app.use(express.static(__dirname + '/../client/'));

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <html>
      <head>
        <title>App</title>
        <style>
          body {
            font-size: 18px;
            font-family: Verdana;
          }
        </style>
      </head>
      <body>
        <div id="content"></div>
        <script src="/app.js"></script>
      </body>
    </html>
  `);
}); 

app.listen(3000, () => console.log('Example app listening on port 3000!'));