const fs = require("fs-extra");
const inputFile = "./dist/bundle.js";
const outputFile = "./bin/create-bulky-start";
const header = "#!/usr/bin/env node";

fs.promises.mkdir("bin")
  .catch(_ => _)
  .then(_ => fs.promises.readFile(inputFile))
  .then(buffer =>
    fs.promises.writeFile(outputFile, `${header}\n`)
      .then(_ => fs.promises.writeFile(outputFile, buffer, {flag: "a+"}))
  )
  .then(_ => fs.chmod(outputFile, "755"))
  .then(_ => console.log("file executabled"))
  .catch(ex => console.error(ex));
