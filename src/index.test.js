import {main} from './main';

var life = 42;
it('main should return 42', () => {
  expect(main()).toBe(life);
});
