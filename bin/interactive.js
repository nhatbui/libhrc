var libhrc = require("../lib/libhrc.js");


var testString = function(s) {
  var lrs = libhrc.findLRS(s);
  if (lrs.length > 0) {
    console.log(libhrc.tagRepeatedPhrases(lrs, s));
  } else {
    console.log(s);
  }
}

testString(process.argv[2]);
