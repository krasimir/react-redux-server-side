import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import express from 'express';
import 'isomorphic-fetch';
import { getUsers } from '../client/selectors';

import App from '../client/App.js';
import createStore from '../client/store';

const app = express();

app.use(express.static(__dirname + '/../client/'));
app.use(express.static(__dirname + '/../../data'));

app.get('*', (req, res) => {
  console.log('request comes in');
  const store = createStore();

  const unsubscribe = store.subscribe(() => {
    const users = getUsers(store.getState());

    if (users !== null && users.length > 0) {
      unsubscribe();

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
            <div id="content">${ ReactDOMServer.renderToString(<Provider store={ store }><App /></Provider>) }</div>
            <script>
              window.__APP_STATE = ${ JSON.stringify(store.getState()) };
            </script>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `);
    }
  });

  ReactDOMServer.renderToString(<Provider store={ store }><App /></Provider>);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));