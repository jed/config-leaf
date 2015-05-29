#!/usr/bin/env node

var cipher = require('crypto').createDecipher;

require('../')(cipher);
