import * as path from 'path';

import {TwingEnvironment, TwingLoaderFilesystem} from 'twing';

// eslint-disable-next-line no-unused-vars
import express, {Express, Request, Response} from 'express';

import {Events} from './API/Events';

const app: Express = express();
const port = 3000;
const loader = new TwingLoaderFilesystem('src/backend/templates');
const twing = new TwingEnvironment(loader);

const eventGroups = ['hs3city', 'Elixir-Tricity'];

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
  const fail = 500;
  events
    .getEventsFromGroups(eventGroups)
    .then(json => res.send(json))
    .catch(() => res.status(fail));
});

function renderCards(req: Request, res: Response) {
  const events = new Events();
  const fail = 500;
  let [cols, rows] = [null, null];

  if (req.query.cols) {
    cols = req.query.cols;
  }

  if (req.query.rows) {
    rows = req.query.rows;
  }

  events
    .getEventsFromGroups(eventGroups)
    .then(json => twing.render('cards.twig', {cols, rows, events: json}).then(output => {
      res.end(output);
    }))
    .catch(() => res.status(fail));
}

app.get('/cards', renderCards);

app.get('/calendar', (req, res) => {
  const startMonthNumber = req.query.month || (new Date().getMonth());
  // eslint-disable-next-line no-magic-numbers
  const periodInSeconds = 60 * 60 * 24 * 30 * 2; // two months
  const startDate = new Date();
  startDate.setMonth(startMonthNumber);
  startDate.setDate(1);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const events = new Events(undefined, startDate, periodInSeconds);
  const fail = 500;
  events
    .getEventsFromGroups(eventGroups)
    .then(json => {
      const firstMonth: any[] = [];
      const secondMonth: any[] = [];
      json.forEach(event => {
        if (event.date.getMonth() === startMonthNumber) {
          firstMonth.push(event);
        } else {
          secondMonth.push(event);
        }
      });

      twing.render('calendar.twig', {eventsFirst: firstMonth, eventsSecond: secondMonth}).then(output => {
        res.end(output);
      });
    })
    .catch(() => res.status(fail));
});

app.listen(port, () => console.log(`Wallboard running on port: ${port}!`));
