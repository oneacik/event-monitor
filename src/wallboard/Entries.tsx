import React from 'react';

// eslint-disable-next-line no-unused-vars
import {Event} from '../API/Event';

import {Entry} from './Entry';


export class Entries extends React.Component<Array<Event>> {

  constructor(props: Array<Event>) {
    super(props);
  }

  render(): any {
    return (
      <div>
        {this.props.map(event => <Entry key={event.id} {...event}/>)}
      </div>
    );
  }

}
