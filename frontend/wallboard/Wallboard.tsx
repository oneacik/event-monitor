import React from 'react';

// eslint-disable-next-line no-unused-vars
import {Event} from '../API/Event';

import {Events} from '../API/Events';

import {Entries} from './Entries';


export class Wallboard
  extends React.Component<{ events: Events },
    {
      loaded: boolean, events: Array<Event>
    }> {

  constructor(props = {events: new Events()}) {
    super(props);
    this.state = {loaded: false, events: []};

    this.props.events.getEventsFromGroup('hs3city')
      .then(unrefinedEvents =>
        unrefinedEvents.map((event: any) =>
          this.props.events.convertFetchEventToEvent(event)))
      .then(events => this.setState({loaded: true, events}));
  }


  render(): any {
    return (
      <div>
        {
          this.state.loaded && <Entries events={this.state.events}/>
        }
      </div>
    );
  }

}
