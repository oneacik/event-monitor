import React from 'react';

// eslint-disable-next-line no-unused-vars
import {Event} from '../../common/Event';

import {Entry} from './Entry';

import './Entries.css';


export class Entries extends React.Component<{ events: Array<Event> }> {

  constructor(props: { events: Array<Event> }) {
    super(props);
  }

  render(): any {
    return (
      <div className={'entries-container'}>
        {this.props.events.map(event => <Entry key={event.id} {...event}/>)}
      </div>
    );
  }
}
