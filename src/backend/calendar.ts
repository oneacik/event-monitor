import {Router} from 'express';
import {TwingEnvironment, TwingLoaderFilesystem} from 'twing';
import {groupBy} from 'lodash';
import HttpStatus from 'http-status-codes';

// eslint-disable-next-line no-unused-vars
import {Event} from '../common/Event';

import {Events} from './API/Events';

// eslint-disable-next-line new-cap
const router = Router();
const loader = new TwingLoaderFilesystem('src/backend/templates');
const twing = new TwingEnvironment(loader);

const polishDayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
const eventGroups = ['hs3city', 'Elixir-Tricity'];
const defaultFontSize = 1.4;

function prepareEventForTemplate(events: Event[], startMonth: Number) {
  const firstMonth: Event[] = [];
  const secondMonth: Event[] = [];

  events.forEach(event => {
    if (event.date.getMonth() === startMonth) {
      firstMonth.push(event);
    } else {
      secondMonth.push(event);
    }
  });

  return {
    firstMonth: groupBy(firstMonth, event => event.date.getDate()),
    secondMonth: groupBy(secondMonth, event => event.date.getDate())
  };
}

router.get('/cards', (req, res) => {
  const events = new Events();
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
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR));
});


router.get('/calendar', (req, res) => {
  const startMonthNumber = req.query.month || (new Date().getMonth());
  const startYearNumber = req.query.year || (new Date().getFullYear());
  // eslint-disable-next-line no-magic-numbers
  const periodInSeconds = 60 * 60 * 24 * 30 * 2; // two months
  const startDate = new Date(startYearNumber, startMonthNumber);

  const events = new Events(undefined, startDate, periodInSeconds);
  events
    .getEventsFromGroups(eventGroups)
    .then(json => {
      const preparedEvents = prepareEventForTemplate(json, startMonthNumber);

      const templateVariables = {
        eventsFirst: preparedEvents.firstMonth,
        eventsSecond: preparedEvents.secondMonth,
        showFooter: !req.query.hideFooter,
        fontSize: req.query.fontSize || defaultFontSize,
        polishDayNames
      };

      twing.render('calendar.twig', templateVariables).then(output => {
        res.end(output);
      });
    })
    .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR));
});

export default router;
