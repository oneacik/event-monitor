import React from 'react';
import ReactDOM from 'react-dom';

import {Events} from '../API/Events';

import {Wallboard} from './Wallboard';

const div = document.createElement('div');
ReactDOM.render(<Wallboard events={new Events()}/>, div);

document.body.appendChild(div);
