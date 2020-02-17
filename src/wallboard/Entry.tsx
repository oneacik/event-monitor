import React from 'react';

import {getFullDate, getWeekDate} from '../util/TimeUtil';

export class Entry extends React.Component<{
  title: string,
  date: Date,
  group: string,
  location: string
}> {

  constructor(
    props: {
      title: string,
      date: Date,
      group: string,
      location: string
    }
  ) {
    super(props);
  }

  render(): any {
    return (
      <div>
        <div className={'title'}>{this.props.title}</div>
        <div className={'group'}>{this.props.group}</div>
        <div className={'location'}>{this.props.location}</div>
        <div className={'date'}>{getFullDate(this.props.date)}</div>
        <div className={'week'}>{getWeekDate(this.props.date)}</div>
      </div>
    );
  }

}
