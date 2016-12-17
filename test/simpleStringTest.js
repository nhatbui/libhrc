var libhrc = require("../lib/libhrc.js");


var testString = function(s, tag=true, multiplier=' x', left_tag='<', right_tag='> ') {
  console.log("Test: '" + s + "'");
  var lrs = libhrc.findLRS(s);
  console.log("LRS: '" + lrs + "'");
  if (lrs.length > 0) {
    console.log("Result: '" + libhrc.tagRepeatedPhrases(lrs, s, tag, multiplier, left_tag, right_tag) + "'");
  }
}

// Twitch chat characteristics:
// - trimmed (no white space(s) at beginning and end)
// - single spaces between words
testString("simple repeat simple repeat simple repeat");
testString("extra words at the start simple repeat simple repeat simple repeat");
testString("simple repeat simple repeat simple repeat extra words at the end");
testString("wrapped at start simple repeat simple repeat simple repeat and at the end")
testString("simple repeat simple repeat simple repeat. <-- period messes things up!");
testString("Capitalization not handled capitalization Not Handled!");
testString("you youngings");
testString("this is the best");
testString("kung fu fun");
testString("check it out, no tags: repeated message but no tags repeated message but no tags", false);
testString("free coins free coins free coins free coins free coins", true, " ↑");
testString("Si se puede Si se puede Si se puede", true, ' x', '¡', '!');
testString("Duck Duck Goose Duck");
testString("");
testString("oneword");
testString("multi run multi run INTERRUPTION multi run multi run multi run");
testString("y y z y y y BUT THIS WORKS, interruption is lexicographically greater than.");
testString("KKona 🎸 KKona 🎸 KKona emojis baby");
