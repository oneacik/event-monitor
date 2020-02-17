// we need to use here normal require() as ts has no concept of anything else
import path from 'path';

import fs from 'fs-extra';


export async function copyProjectTo(to: string) {
  const from: string = path.join(__dirname, '../');
  const realTo = path.resolve(to);

  console.log(`copying files ${from} -> ${realTo}`);

  return fs.copy(from, realTo, {recursive: true});
}
