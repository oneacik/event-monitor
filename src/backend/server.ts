import * as path from 'path';

// eslint-disable-next-line no-unused-vars
import express, {Express} from 'express';

import {TwingEnvironment, TwingLoaderFilesystem} from 'twing';

import {Events} from './API/Events';

const app: Express = express();
const port = 3000;
const loader = new TwingLoaderFilesystem('src/backend/templates');
const twing = new TwingEnvironment(loader);

app.use(express.json());

app.use('/app/', express.static(path.join(__dirname, '../dist'), {
  setHeaders(res) {
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

app.get('/', (req, res) => res.redirect('/app'));

app.get('/api', (req, res) => {
  const events = new Events();
  const fail = 500;
  events.getEventsFromGroups(['hs3city', 'Elixir-Tricity'])
    .then(json => res.send(json))
    .catch(() => res.status(fail));
});

app.get('/twing', (req, res) => {
  twing.render('index.twig', {name: 'World'}).then(output => {
    res.end(output);
  });
});


app.listen(port, () => console.log(`Wallboard running on port: ${port}!`));
