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

  var input = function(query, callback) {
    var stdin = process.openStdin(),
        i = 0;
    process.stdin.on("data", function(char) {
        char = char + "";
        switch (char) {
            case "\n":
            case "\r":
            case "\u0004":
                stdin.pause();
                break;
            default:
                process.stdout.write("\033[2K\033[200D" + Array(rl.line.length+1).join("*"));
		i++;
                break;
        }
    });

    rl.question(query, function(value) {
        rl.history = rl.history.slice(1);
        callback(value);
    });
  }
  
  input("Enter the config password ("+path.basename(to)+"):\n", function(password) {
    from = fs.createReadStream(from)
    to   = fs.createWriteStream(to)
    fn   = fn("cast5-cbc", password)

    from.pipe(fn).pipe(to)
    from.on("end", rl.close.bind(rl))
  })
}
