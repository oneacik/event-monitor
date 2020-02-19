import React from 'react';

// eslint-disable-next-line no-unused-vars
import {Event} from '../../common/Event';

import Query from '../../common/Query';

import {Entries} from './Entries';


export class Wallboard
  extends React.Component<{ query: Query },
    {
      loaded: boolean, events: Array<Event>
    }> {

  constructor(props = {query: new Query()}) {
    super(props);
    this.state = {loaded: false, events: []};


    const query = () => this.props.query.query('/api')
      .then((events: Array<Event>) => events.map(event =>
        new Event(event.id, event.title, new Date(event.date), event.group, event.location))
      )
      .then((events: Array<Event>) => this.setState({loaded: true, events}));


    const minute = 60000;

    query();
    setTimeout(() => {
      this.setState({loaded: false});
      query();
      console.log('REFRESHED');
    }, minute);
  }


  render(): any { // @TODO add spinner
    return (
      <div>
        {
          this.state.loaded && <Entries events={this.state.events}/>
        }
      </div>
    );
  }

}
