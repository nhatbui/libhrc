const assert = require('assert');
var libhrc = require('../lib/libhrc.js');


var testString = function(s,
                          truth=null,
                          delimiter=' ',
                          showNum=true,
                          multiplier=' x',
                          left_tag='<',
                          right_tag='>') {
  console.log("Test: '" + s + "'");
  var newDoc = libhrc.naive_compress(s, delimiter, showNum, multiplier, left_tag, right_tag);
  console.log("Result: '" + newDoc + "'");
  if (truth) {
    assert.deepStrictEqual(newDoc, truth);
  }
};

var testStringGreedy = function(s,
                          truth=null,
                          delimiter=' ',
                          showNum=true,
                          multiplier=' x',
                          left_tag='<',
                          right_tag='>') {
  console.log("Test: '" + s + "'");
  var newDoc = libhrc.greedy_compress(s, delimiter, showNum, multiplier, left_tag, right_tag);
  console.log("Result: '" + newDoc + "'");
  if (truth) {
    assert.deepStrictEqual(newDoc, truth);
  }
};

// Twitch chat characteristics:
// - trimmed (no white space(s) at beginning and end)
// - single spaces between words
testString(
  'simple repeat simple repeat simple repeat',
  '<simple repeat x3>'
);
testString(
  'extra words at the start simple repeat simple repeat simple repeat',
  'extra words at the start <simple repeat x3>'
);
testString(
  'simple repeat simple repeat simple repeat extra words at the end',
  '<simple repeat x3> extra words at the end'
);
testString(
  'wrapped at start simple repeat simple repeat simple repeat and at the end',
  'wrapped at start <simple repeat x3> and at the end'
);
testString(
  'simple repeat simple repeat simple repeat. <-- period messes things up!',
  'simple <repeat simple x2> repeat. <-- period messes things up!'
);
testString(
  'Capitalization not handled capitalization Not Handled!',
  'Capitalization not handled capitalization Not Handled!'
);
testString(
  'you youngings',
  'you youngings'
);
testString(
  'this is the best',
  'this is the best'
);
testString(
  'kung fu fun',
  'kung fu fun'
);
testString(
  'check it out, no tags: repeated message but no tags repeated message but no tags',
  'check it out, no tags: repeated message but no tags',
  ' ', false, '', '', '');
testString(
  'free coins free coins free coins free coins free coins',
  '<free coins free coins ↑2> free coins',
  ' ', true, ' ↑');
testString(
  'free coins free coins free coins free coins',
  '<free coins free coins ↑2>',
  ' ', true, ' ↑');
testString(
  'Si se puede Si se puede Si se puede',
  '¡Si se puede x3!',
  ' ', true, ' x', '¡', '!');
testString(
  'Duck Duck Goose Duck',
  '<Duck x2> Goose Duck'
);
testString('', '');
testString(
  'oneword',
  'oneword'
);
testString(
  'multi run multi run INTERRUPTION multi run multi run multi run',
  '<multi run x2> INTERRUPTION <multi run x3>'
);
testString(
  'y y z y y y interruption is lexicographically greater than.',
  '<y x2> z <y x3> interruption is lexicographically greater than.'
);
testString(
  'KKona 🎸 KKona 🎸 KKona emojis baby',
  'KKona <🎸 KKona x2> emojis baby'
);
testString(
  'y y y yolo baggins y y y y',
  'y y y yolo baggins <y y x2>'
);
testString(
  'y y y y yolo baggins y y y y',
  '<y y x2> yolo baggins <y y x2>'
);
testString(
  'yayayayayoloabagginsayayayay',
  '<yay x2>ayoloabagginsa<yay x2>',
  'a'
);
testStringGreedy(
  'y b y b y b b b b b b',
  '<y b x2> y <b x6>'
);
testStringGreedy(
  'y b y b y b n b n b n b',
  '<y b x3> <n b x3>'
);
testStringGreedy(
  'Kappa Kappa Kappa Kappa',
  '<Kappa x4>'
);
testStringGreedy(
  'GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE? GROSS GORE?',
  '<GROSS GORE? x32>'
);
