/* eslint-disable camelcase */

import urljoin from 'url-join';

import {getISODate} from '../../frontend/util/TimeUtil';

import {Event} from '../../common/Event';

import Query from '../../common/Query';


export class Events {
  private defaultPeriodInSeconds: number;
  private startDate: Date;
  private query: Query;

  constructor(
    query: Query = new Query(),
    startDate: Date = new Date(),
    // eslint-disable-next-line no-magic-numbers
    defaultPeriodInSeconds: number = 60 * 60 * 24 * 30 // a month
  ) {
    this.defaultPeriodInSeconds = defaultPeriodInSeconds;
    this.startDate = startDate;
    this.query = query;
  }

  getEventsFromGroups(groups: Array<string>): Promise<Array<Event>> {
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
    const params : {[index: string]:any} = {
      has_ended: 'false',
      no_earlier_than: getISODate(this.startDate),
      no_late_than: getISODate(this.getNoLaterDate(this.startDate))
    };

    let params_string = '?';
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const value : string = params[param];
        params_string += `${param}=${value}&`;
      }
    }

    const url = urljoin(group, 'events', params_string);

    console.log(url);

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
