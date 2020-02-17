//import ReactTestUtils from 'react-dom/test-utils'; // ES6
import {act} from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

import React from 'react';

import {Entry} from './Entry';


let container: HTMLDivElement | undefined;

beforeAll(() => {
  container = document.createElement('div');
});

it('Entry Component renders properly', () => {
  act(() => {
    // @ts-ignore
    ReactDOM.render(<Entry group={'hs3'} location={'HS'} title={'xD'} date={new Date('2020-02-17T21:37')}/>, container);
  });

  const entry: Element | undefined = container?.children[0];

  const extractText = (x: string) =>
    entry?.getElementsByClassName(x)[0].textContent;

  expect(extractText('group')).toBe('hs3');
  expect(extractText('location')).toBe('HS');
  expect(extractText('title')).toBe('xD');
  expect(extractText('date')).toBe('17-02 21:37');
  expect(extractText('week')).toBe('Poniedziałek');
});
