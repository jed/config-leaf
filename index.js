var crypto	 = require("crypto")
var fs			 = require("fs")
var readline = require("readline")
var path		 = require("path")

module.exports = function(fn) {
	var argv = require('minimist')(process.argv.slice(2));
	var from = path.join(process.cwd(), process.argv[2])
	var to	 = path.join(process.cwd(), process.argv[3])

	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	var input = function(query, callback) {
		if (argv.PW){
			if(process.env[argv.PW]){
				callback(process.env[argv.PW], true);
			}else{
				console.error(new Error("Environmental variable \""+argv.PW+"\" has not been set."));
				process.exit(1)
	  		}
		}else{
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
	}
	
	input("Enter the config password ("+path.basename(to)+"):\n", function(password, env_var_bool) {
		from = fs.createReadStream(from)
		to   = fs.createWriteStream(to)
		fn	 = fn("cast5-cbc", password)

		from.pipe(fn).pipe(to)
		from.on("end", function () {
			rl.write("done\n");
			if(!env_var_bool){
				rl.close.bind(rl);
			}else{
				process.exit();
			}
		});
	})
}
