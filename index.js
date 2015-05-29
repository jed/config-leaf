/**
 * @fileoverview Encrypt or decrypt the given file after prompting the user for
 * his or her password.
 * @since 0.2.0
 */

var crypto = require('crypto');
var fs = require('fs');
var inquirer = require('inquirer');
var path = require('path');

module.exports = function (fn) {
  var sourcePath = path.join(process.cwd(), process.argv[2]);
  var destPath = path.join(process.cwd(), process.argv[3]);

  inquirer.prompt([{
    type: 'password',
    message: 'Enter the config password',
    name: 'password'
  }], function (answers) {
    var sourceStream = fs.createReadStream(sourcePath);
    var destStream = fs.createWriteStream(destPath);
    var cipher = fn('cast5-cbc', answers.password);

    sourceStream.pipe(cipher).pipe(destStream);
  });
};
