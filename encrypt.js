#!/usr/bin/env node

var crypto     = require("crypto")
var configleaf = require("./")

configleaf(crypto.createCipher, process.argv[2], process.argv[3])
