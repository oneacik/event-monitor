# create-bulky-start

## Introduction

Bulky start currently copies itself.
It is great starter for coding cli for node.
It contains:
- webpack
- babel
- linter
- typescript
- javascript
- example for initializer and usage

## Problems on the way

### Add your script to "bin" in package.json

Initializer is just a script executed npm init smth => npx create-smth.
Just follow tutorials on creating cli apps in npm.

### Remember about #!/usr/bin/env node

Without it the npm init will tell you that your script doesn't exist.
I already created PR for this.

## Ending

Goodluck.
