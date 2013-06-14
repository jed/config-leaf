var crypto   = require("crypto")
var fs       = require("fs")
var readline = require("readline")
var path     = require("path")

module.exports = function(fn, from, to) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question("Enter the config password:\n", function(password) {
    rl.close()

    from = fs.createReadStream(path.join(process.cwd(), from))
    to   = fs.createWriteStream(path.join(process.cwd(), to))
    fn   = fn("cast5-cbc", password)

    from.pipe(fn).pipe(to)
  })
}
