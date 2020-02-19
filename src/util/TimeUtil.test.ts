import {getFullDate, getISODate, getWeekDate} from './TimeUtil';

test('returns correct day of week', () => {
  expect(getWeekDate(new Date('2020-02-17'))).toBe('Poniedziałek');
});

test('returns nice date', () => {
  expect(getFullDate(new Date('2019-06-11T21:37'))).toBe('11-06 21:37');
});


test('returns correct ISO date', () => {
  expect(getISODate(new Date('2019-06-11T21:37'))).toBe('2019-06-11T21:37:00.000');
});
