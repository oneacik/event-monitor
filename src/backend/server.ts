import * as path from 'path';

// eslint-disable-next-line no-unused-vars
import express, {Express} from 'express';

import {Events} from './API/Events';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use('/app/', express.static(path.join(__dirname, '../dist'), {
  setHeaders(res) {
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', (req, res) => {
  const events = new Events();
  const fail = 500;
  events.getEventsFromGroups(['hs3city', 'Elixir-Tricity'])
    .then(json => res.send(json))
    .catch(() => res.status(fail));

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
