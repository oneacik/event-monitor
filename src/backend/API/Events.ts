/* eslint-disable camelcase */

import urljoin from 'url-join';

import {getISODate} from '../../frontend/util/TimeUtil';

import {Event} from '../../common/Event';

import Query from '../../common/Query';


export class Events {
  private defaultPeriodInSeconds: number;
  private query: Query;

  constructor(
    query: Query = new Query(),
    // eslint-disable-next-line no-magic-numbers
    defaultPeriodInSeconds: number = 60 * 60 * 24 * 30 // a month
  ) {
    this.defaultPeriodInSeconds = defaultPeriodInSeconds;
    this.query = query;
  }

  getEventsFromGroups(groups: [string]): Promise<Array<Event>> {
    return Promise.all(
      groups.map(
        group => this.getRawEventsFromGroup(group)
          .then(events =>
            events.map(event => this.convertFetchEventToEvent(event)))))
      .then(eventsOfEvents => eventsOfEvents.flat())
      // @ts-ignore
      .then(events => events.sort((a, b) => (a.date - b.date)));
    //TODO: MOCK query FOR TESTS
  }

  getRawEventsFromGroup(group: string): Promise<Array<any>> {
    const url = urljoin(group, 'events', `?has_ended=false&no_later_than=${getISODate(this.getNoLaterDate())}`);
    return this.query.query(url);
  }

  getNoLaterDate(argDate: Date = new Date()): Date {
    const date: Date = new Date(+argDate);
    date.setSeconds(date.getSeconds() + this.defaultPeriodInSeconds);
    return date;
  }

  convertFetchEventToEvent(fetchEvent: {
    id: string,
    name: string,
    local_date: string,
    local_time: string,
    group: { name: string },
    venue: { name: string }
  }): Event {
    const date: Date = new Date(`${fetchEvent.local_date}T${fetchEvent.local_time}`);
    return new Event(
      fetchEvent.id,
      fetchEvent.name,
      date,
      fetchEvent.group.name,
      fetchEvent.venue.name
    );
  }
}
