#!/usr/bin/env node

var cipher = require('crypto').createCipher;

require('../')(cipher);
