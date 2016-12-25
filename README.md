# libhrc

Human-Readable Compression

[![Build Status](https://travis-ci.org/nhatbui/libhrc.svg?branch=master)](https://travis-ci.org/nhatbui/libhrc)

```
var libhrc = require('libhrc');
var s = "Yolo Baggins Yolo Baggins Yolo Baggins Baggins Baggins Baggins Baggins Baggins";
console.log(libhrc.greedy_compress(s, ' ', true, ' x', '<', '>'));
```

[Demo](https://compakt.nhatqbui.com)

# Installation

`$ npm install libhrc`

# Features

* finds repeated _words_, not subsequence of characters.
* use tagging to stylize repeats (e.g. for HTML/CSS)

# Philosophy

Reduce sentence length by finding repeated words/sequence of words.
Make output easily decoded by a human reader.

# Tests

`npm test`

# License

[MIT](https://github.com/nhatbui/libhrc/blob/master/LICENSE)
