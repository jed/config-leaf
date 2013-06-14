#!/usr/bin/env node

var crypto     = require("crypto")
var configleaf = require("./")

configleaf(crypto.createDecipher, process.argv[2], process.argv[3])
