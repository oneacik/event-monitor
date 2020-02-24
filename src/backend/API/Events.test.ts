/* eslint-disable no-magic-numbers, camelcase */
import {Events} from './Events';

const eventCreate = (eventName = 'name', local_time = '18:00', venue = 'hs3', group = 'hs3', local_date = '2020-02-19') => ({
  name: eventName,
  local_time,
  local_date,
  group: {
    name: group
  },
  venue: {
    name: venue
  }
});

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
  description: 'description',
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

test('getEventsFromGroups queries and sorts correctly', async () => {
  const query: Query = {async query(url:string) {
    if (url.match(/hs3city\/./)) {
      return [eventCreate('d', '17:00'), eventCreate('b', '15:00')];
    } else
    if (url.match(/hswaw\/./)) {
      return [eventCreate('a', '14:00'), eventCreate('c', '16:00')];
    }
    console.log(url);
    return null;
  }};

  const events = new Events(query);
  const returnedEvents = await events.getEventsFromGroups(['hs3city', 'hswaw']);

  expect(returnedEvents[0].title).toBe('a');
  expect(returnedEvents[1].title).toBe('b');
  expect(returnedEvents[2].title).toBe('c');
  expect(returnedEvents[3].title).toBe('d');

});
