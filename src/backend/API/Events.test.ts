/* eslint-disable no-magic-numbers, camelcase */
import {Events} from './Events';

const sampleEventJSON = {
  created: 1578480494000,
  duration: 7200000,
  id: 'cltrmrybcdbzb',
  name: 'Fast.ai: Deep Learning from the Foundations',
  rsvp_limit: 25,
  date_in_series_pattern: false,
  status: 'upcoming',
  time: 1582131600000,
  local_date: '2020-02-19',
  local_time: '18:00',
  updated: 1578480494000,
  utc_offset: 3600000,
  waitlist_count: 0,
  yes_rsvp_count: 1,
  venue: {
    id: 25186630,
    name: 'Hackerspace Trójmiasto',
    lat: 54.389617919921875,
    lon: 18.58177947998047,
    repinned: true,
    address_1: 'Aleja Wojska Polskiego 41',
    address_2: 'Schowane za budynkiem mieszkalnym o nr. 39.',
    city: 'Gdansk',
    country: 'pl',
    localized_country_name: 'Poland'
  },
  group: {
    created: 1470602737000,
    name: 'Hacker:space Trójmiasto',
    id: 20290061,
    join_mode: 'open',
    lat: 54.36000061035156,
    lon: 18.639999389648438,
    urlname: 'hs3city',
    who: 'Hackers',
    localized_location: 'Gdansk, Poland',
    state: '',
    country: 'pl',
    region: 'en_US',
    timezone: 'Europe/Warsaw'
  },
  link: 'https://www.meetup.com/hs3city/events/cltrmrybcdbzb/',
  description: '<p>In this study group, we will be working through the Fast.ai deep learning course "Deep Learning from the Foundations":<br/><a href="https://course.fast.ai/part2" class="linkified">https://course.fast.ai/part2</a></p> <p>This meetup is free and open to all. We recommend it to people who are already involved in Deep Learning, understand it\'s practical applications and want to get deeper understanding. Finishing Part 1 of Fast.ai course is sufficient.</p> <p>We meet every 2 weeks, on Wednesday, 18:00-20:00.<br/>The whole course will have at least 7 meetings - depending on our pace.</p> <p>More info and schedule on wiki:<br/><a href="https://wiki.hs3.pl/wydarzenia/datascience#kurs_deep_learning_from_the_foundations_-_fastai" class="linkified">https://wiki.hs3.pl/wydarzenia/datascience#kurs_deep_learning_from_the_foundations_-_fastai</a></p> <p>---</p> <p>Welcome to Fast.ai Part 2: Deep Learning from the Foundations, which shows how to build a state of the art deep learning model from scratch.<br/>It takes you all the way from the foundations of implementing matrix multiplication and back-propagation, through to high performance mixed-precision training, to the latest neural network architectures and learning techniques, and everything in between.<br/>It covers many of the most important academic papers that form the foundations of modern deep learning, using “code-first” teaching, where each method is implemented from scratch in python and explained in detail (in the process, we’ll discuss many important software engineering techniques too).<br/>Before starting this part, it\'s nice to have completed Fast.ai Part 1: Practical Deep Learning for Coders.</p> <p>The first five lessons use Python, PyTorch, and the fastai library; the last two lessons use Swift for TensorFlow, and are co-taught with Chris Lattner, the original creator of Swift, clang, and LLVM.</p> ',
  visibility: 'public',
  member_pay_fee: false
};

test('returned noLaterDate is correct', () => {
  const events = new Events(undefined, 60 * 60 * 24 * 30);
  const laterDate: Date = events.getNoLaterDate(new Date(2020, 3, 17));
  expect(laterDate.getDate()).toBe(17);
  expect(laterDate.getMonth()).toBe(4);
  expect(laterDate.getFullYear()).toBe(2020);
});


it('returned events follow API', async () => {
  const events = new Events(undefined, 60 * 60 * 24 * 30);
  const returnedEvents = await events.getRawEventsFromGroup('hs3city');
  expect(returnedEvents).toBeInstanceOf(Array);
});

test('convertFetchEventToEvent converts currently', () => {
  const events = new Events();
  const returnedEvent =
    events.convertFetchEventToEvent(sampleEventJSON);
  expect(returnedEvent.id).toBe('cltrmrybcdbzb');
  expect(returnedEvent.title).toBe('Fast.ai: Deep Learning from the Foundations');
  expect(returnedEvent.date.toString())
    .toBe(new Date('2020-02-19T18:00').toString());
  expect(returnedEvent.group).toBe('Hacker:space Trójmiasto');
  expect(returnedEvent.location).toBe('Hackerspace Trójmiasto');
});
