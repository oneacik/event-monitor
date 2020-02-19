import nodeFetch from 'node-fetch';
import urljoin from 'url-join';

export default class Query {
  fetcher: any;

  base: string;

  constructor(base: string = 'http://api.meetup.com/') {
    this.base = base;
    this.fetcher = (typeof fetch !== 'undefined' && fetch.bind(window)) || nodeFetch;
  }


  query(url: string): Promise<Array<any>> {
    return this.fetcher(urljoin(this.base, url))
      .then((response: Response) => response.json())
      .catch((err: any) => console.error(err));
  }


}
