var crypto   = require("crypto")
var fs       = require("fs")
var readline = require("readline")
var path     = require("path")

module.exports = function(fn) {
  var from = path.join(process.cwd(), process.argv[2])
  var to   = path.join(process.cwd(), process.argv[3])

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question("Enter the config password:\n", function(password) {
    from = fs.createReadStream(from)
    to   = fs.createWriteStream(to)
    fn   = fn("cast5-cbc", password)

    from.pipe(fn).pipe(to).on("end", rl.close)
  })
}
