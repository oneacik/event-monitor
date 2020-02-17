import {copyProjectTo} from './main.ts';

const argsLength = 3;
const pathPosition = 2;

if (process.argv.length !== argsLength) {
  throw new Error('USAGE "npm init bulkstart ABSOLUTE_PATH"');
}

const output = process.argv[pathPosition];

copyProjectTo(output).catch(e => console.error(e));

