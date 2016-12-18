var getLCPArray = require("../lib/lrcs.js");
var tagRepeats = require("../lib/tagRepeats.js");


var naive_compress = function(s, showNum=false, multiplier="", left_tag="", right_tag="") {
  var lcp_array = getLCPArray(s);
  //console.log(lcp_array);
  if (lcp_array.length > 0) {
    // Start from the longest LCP and find the first the compresses the original
    // string.
    var compressed_len = s.length;
    var i = lcp_array.length - 1;
    var lrs = null;
    var newDoc = null;
    while(i >= 0 && compressed_len >= s.length) {
      lrs = lcp_array[i];
      if (lrs.length > 0) {
        newDoc = tagRepeats(
          lrs, s, showNum, multiplier, left_tag, right_tag
        );
        compressed_len = newDoc.length;
      }
      i--;
    }
    return newDoc;
  } else {
    return s;
  }
}

module.exports.getLCPArray = getLCPArray;
module.exports.tagRepeatedPhrases = tagRepeats;
module.exports.naive_compress = naive_compress;
