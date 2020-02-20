import React from 'react';
import ReactDOM from 'react-dom';

import Query from '../../common/Query';

import {Wallboard} from './Wallboard';

const div = document.createElement('div');
ReactDOM.render(<Wallboard query={new Query('/')}/>, div);

document.body.appendChild(div);
