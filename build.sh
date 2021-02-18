set -x
npm install
npm start &
./node_modules/.bin/wait-on http://localhost:3000
node pup.js
