var crypto    = require("crypto");
var fs        = require("fs");
var prompt    = require("prompt");
var path      = require("path");

function runCrypto(fn, from, to, password, finished) {
  from = fs.createReadStream(from);
  to   = fs.createWriteStream(to);
  fn   = fn("cast5-cbc", password);
  
  from.pipe(fn).pipe(to);
  from.on("end", function () {
    console.log("done");
  });
}

module.exports = function(fn) {
  var from = path.join(process.cwd(), process.argv[2]);
  var to   = path.join(process.cwd(), process.argv[3]);
  var password = process.argv[4];

  if (password) {
    runCrypto(fn, from, to, password);
    return;
  }

  // Password isn't given in the command line, read it from prompt

  prompt.start();
  
  prompt.get([
    {
      description: "Enter the config password (" + path.basename(to) + "):\n",
      name: "password",
      type: "string",
      hidden: true,
      replace: "*",
      required: true
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      prompt.stop();
      
      runCrypto(fn, from, to, result.password);
    }
  });
};
