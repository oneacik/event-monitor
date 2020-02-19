import React from 'react';

// eslint-disable-next-line no-unused-vars
import Card from 'react-bootstrap/Card';


import ListGroup from 'react-bootstrap/ListGroup';

import ListGroupItem from 'react-bootstrap/ListGroupItem';

import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line no-unused-vars
import {Event} from '../../common/Event';
import {getFullDate, getWeekDate} from '../util/TimeUtil';

import './Entry.css';

export class Entry extends React.Component<Event> {

  constructor(props: Event) {
    super(props);
  }

  render(): any {
    return (
      <Card className={'card'}>
        <Card.Body>
          <Card.Title className={'title'}>
            {this.props.title}
          </Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroupItem className={'location'}>{this.props.location}</ListGroupItem>
          <ListGroupItem className={'date'}>{getFullDate(this.props.date)}</ListGroupItem>
          <ListGroupItem className={'week'}>{getWeekDate(this.props.date)}</ListGroupItem>
        </ListGroup>
      </Card>
    );
  }

}

/*
* <div>
        <div className={'title'}>{this.props.title}</div>
        <div className={'group'}>{this.props.group}</div>
        <div className={'location'}>{this.props.location}</div>
        <div className={'date'}>{getFullDate(this.props.date)}</div>
        <div className={'week'}>{getWeekDate(this.props.date)}</div>
      </div>
* */
