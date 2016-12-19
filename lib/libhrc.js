var getLCPArray = require('../lib/lrcs.js');
var tagRepeats = require('../lib/tagRepeats.js');

/**
 * Replace sequential repeats, runs, by one instance of the pattern.
 * Optionally, add styling to all reduced runs.
 * @param {string} s - String to compress (hopefully).
 * @param {boolean} [showNum=false] - Flag to show number of repeats.
 * @param {string} [multiplier=''] - String to show before number of repeats.
 * @param {string} [left_tag=''] - String to show before start of run.
 * @param {string} [right_tag=''] - String to show at the end of run.
 * @return {string} new string - If repeats are found, return new string whose
 * runs have been compressed to one instance of the repeated pattern. If not,
 * return original string.
 */
var naive_compress = function(s,
                              showNum=false,
                              multiplier='',
                              left_tag='',
                              right_tag='') {
  var lcp_array = getLCPArray(s);
  //console.log(lcp_array);
  if (lcp_array.length > 0) {
    // Starting from the longest LCP, find the first LCP that compresses the
    // original string.
    var i = lcp_array.length - 1;
    var lrs = null;
    while (i >= 0) {
      var testlrs = lcp_array[i];
      var testCompress = tagRepeats(testlrs, s);
      if (testCompress.length < s.length) {
        lrs = testlrs;
        break;
      }
      i--;
    }

    if (lrs) {
      return tagRepeats(lrs, s, showNum, multiplier, left_tag, right_tag);
    } else {
      return s;
    }
  } else {
    return s;
  }
};

module.exports.getLCPArray = getLCPArray;
module.exports.tagRepeatedPhrases = tagRepeats;
module.exports.naive_compress = naive_compress;
