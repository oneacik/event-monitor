/* eslint-disable camelcase */

import urljoin from 'url-join';

import {getISODate} from '../util/TimeUtil';

import Query from './Query';

import {Event} from './Event';


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

  getEventsFromGroup(group: string): Promise<Array<Object>> {
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
