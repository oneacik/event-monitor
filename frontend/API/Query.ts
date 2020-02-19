//import nodeFetch from 'node-fetch';
import urljoin from 'url-join';

export default class Query {
  fetcher: any;

  base: string;

  constructor(base: string = 'http://api.meetup.com/') {
    this.base = base;
    this.fetcher = window.fetch; //|| nodeFetch;
  }


  query(url: string): Promise<Array<Object>> {
    return fetch(urljoin(this.base, url))
      .then((response: Response) => response.json());
  }


}
