import * as path from 'path';

// eslint-disable-next-line no-unused-vars
import express, {Express, Request, Response} from 'express';
import HttpStatus from 'http-status-codes';

import calendar from './calendar';
import {Events} from './API/Events';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(
  '/app/',
  express.static(path.join(__dirname, '../dist'), {
    setHeaders(res) {
      res.set('Access-Control-Allow-Origin', '*');
    }
  })
);

app.use(
  '/static/',
  express.static(path.join(__dirname, '../static'), {
    setHeaders(res) {
      res.set('Access-Control-Allow-Origin', '*');
    }
  })
);

app.get('/', (req, res) => res.redirect('/app'));

app.get('/api', (req, res) => {
  const events = new Events();
  events
    .getEventsFromGroups(['hs3city', 'Elixir-Tricity'])
    .then(json => res.send(json))
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR));
});

app.use('/', calendar);

app.listen(port, () => console.log(`Wallboard running on port: ${port}!`));
