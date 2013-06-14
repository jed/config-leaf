config-leaf
===========

[![Build Status](https://travis-ci.org/jed/config-leaf.png?branch=master)](https://travis-ci.org/jed/config-leaf) (tests work on my end, but not on travis... WHY?)

config-leaf helps you hide your sensitive node.js bits in plain sight. It was based on [John Resig](https://github.com/jeresig)'s post, [Keeping Passwords in Source Control](http://ejohn.org/blog/keeping-passwords-in-source-control/).

The idea is that the configuration of deployed apps can be managed in version control for transparency and ease of rollback. But, since configuration often contains sensitive information like passwords, it shouldn't be kept in plaintext. This is where config-leaf comes in, by letting you encrypt your config in development, check it in, and then decrypt it in production or other dev environments.

Installation and configuration
------------------------------

Let's say that we have a node.js project with some sensitive configuration information, kept in a file called `config.json`.

First, install this library as a dependency in project:

    npm install config-leaf --save

Then, make sure that you add this sensitive file to your `.gitignore` (or appropriate ignore file depending on your version control system) to make sure it never gets checked in:

    echo config.json >> .gitignore

Finally, edit your `package.json` to add the `encrypt` and `decrypt` scripts, such as in the following:

```json
{
  "name": "my-project",
  "version": "0.0.1",
  "scripts": {
    ...
    "encrypt": "encrypt config.json config.json.cast5",
    "decrypt": "decrypt config.json.cast5 config.json"
  }
}
```

Here, the `encrypt` script will encrypt the `config.json` file as `config.json.cast5`, and the `decrypt` script will decrypt the `config.json.cast5` file as `config.json`. In both cases, the name of the encrypted file can be chosen arbitrarily.

Usage
-----

Once config-leaf is installed and configured, run the `encrypt` command every time you update your configuration, and enter the password when prompted.

    npm run encrypt

This saves the encrypted file according to the name you set in your `package.json`.

After checking the file in, use the `decrypt` command in production or other dev environments, and enter the password when prompted.

    npm run decrypt

Again, this saves the decrypted file according to the name you set in your `package.json`.

TODO
----

- Compare timestamps to make sure decrypted file is up to date.

LICENSE
-------

(The MIT License)

Copyright (c) 2013 Jed Schmidt &lt;where@jed.is&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
