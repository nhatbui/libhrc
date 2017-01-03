var LCPArray = require('../lib/lcpArray.js');
var tagging = require('../lib/tagRepeats.js');
var common = require('../lib/common.js');

/**
 * Replace sequential repeats, runs, by one instance of the pattern.
 * Optionally, add styling to all reduced runs.
 * @param {string} s - String to compress (hopefully).
 * @param {string} delimiter - String to split s into tokens.
 * @param {boolean} showNum - Flag to show number of repeats.
 * @param {string} multiplier - String to show before number of repeats.
 * @param {string} left_tag - String to show before start of run.
 * @param {string} right_tag - String to show at the end of run.
 * @return {string} If repeats are found, return new string whose
 * runs have been compressed to one instance of the repeated pattern. If not,
 * return original string.
 */
var naive_compress = function(s,
                              delimiter,
                              showNum,
                              multiplier,
                              left_tag,
                              right_tag) {
  var lcp_array = LCPArray(s, delimiter);
  lcp_array = lcp_array.filter(function(x) { return x.length > 0; });

  if (lcp_array.length > 0) {
    // Starting from the longest LCP, find the first LCP that compresses the
    // original string.

    // Sort the LCP array so we know we are going in order of length of common
    // prefix.
    lcp_array.sort(function(a, b) {
      if (a.length < b.length) {
        return -1;
      } else if (a.length > b.length) {
        return 1;
      } else {
        return 0;
      }
    });

    var i = lcp_array.length - 1;
    var lrs = null;
    while (i >= 0) {
      var testlrs = lcp_array[i];
      var testCompress = tagging.tagRepeats(testlrs, s, delimiter);
      if (testCompress.length < s.length) {
        lrs = testlrs;
        break;
      }
      i--;
    }

    if (lrs) {
      return tagging.tagRepeats(lrs, s, delimiter, showNum, multiplier, left_tag, right_tag);
    } else {
      return s;
    }
  } else {
    return s;
  }
};

/**
 * Replace sequential repeats, runs, by one instance of the pattern.
 * Optionally, add styling to all reduced runs.
 * Greedy heuristic where matches are checked starting at the longest common
 * prefix.
 * @param {string} s - String to compress (hopefully).
 * @param {string} delimiter - String to split s into tokens.
 * @param {boolean} showNum - Flag to show number of repeats.
 * @param {string} multiplier - String to show before number of repeats.
 * @param {string} left_tag - String to show before start of run.
 * @param {string} right_tag - String to show at the end of run.
 * @return {string} If repeats are found, return new string whose
 * runs have been compressed to one instance of the repeated pattern. If not,
 * return original string.
 */
var greedy_compress = function(s,
                               delimiter,
                               showNum,
                               multiplier,
                               left_tag,
                               right_tag) {
  var lcp_array = LCPArray(s, delimiter);
  lcp_array = lcp_array.filter(function(x) { return x.length > 0; });

  if (lcp_array.length > 0) {
    // Estimate the savings of each LCP
    var lcp_savings = [];
    for (var i = 0; i < lcp_array.length; i++) {
      // Find runs of testlrs.
      var runs = tagging.findRuns(lcp_array[i], s, delimiter);

      // Filter only runs of length greater than 1.
      var newRuns = runs.filter(function(x) { return x.count > 1; });

      // Savings = (num_tokens_in_pattern) * (repeats - 1)
      var savings = 0;
      for (var j = 0; j < newRuns.length; j++) {
        // Count the number of delimiters
        var delimiterCount = common.findAllIndices(newRuns[j].pattern, ' ');
        // Tokens = num_delimiters + 1
        var tokensCount = delimiterCount.length + 1;
        // Compute savings
        savings += (newRuns[j].count - 1) * tokensCount;
      }
      lcp_savings.push({ string: lcp_array[i], savings: savings });
    }

    // Sort by ascending savings
    lcp_savings.sort(function(a, b) {
      return a.savings - b.savings;
    });

    // Check LCP in descending savings, starting with the largest.
    var testStr = s;
    var greedySet = [];
    for (var i = lcp_savings.length - 1; i >= 0; i--) {
      var testlrs = lcp_savings[i].string;

      // Find runs of testlrs.
      var runs = tagging.findRuns(testlrs, testStr, delimiter);

      // Filter only runs of length greater than 1.
      var newRuns = runs.filter(function(x) { return x.count > 1; });

      // Use these runs to delete from string.
      // Deleting is important to find sebsequent runs of other LCS.
      for (x of newRuns) {
        testStr = common.nullOutChars(
          testStr, x.start, x.start + x.pattern.length * x.count + (x.count - 1), ' '
        );
      }

      // Add to the set
      greedySet.push.apply(greedySet, newRuns);
    }

    if (greedySet.length > 0) {
      // Sort set for tagging.
      var sortedGreedySet = greedySet.sort(function(a, b) {
        return a.start - b.start;
      });
      return tagging.tagRuns(sortedGreedySet, s, delimiter, showNum, multiplier, left_tag, right_tag);
    } else {
      return s;
    }
  } else {
    return s;
  }
};

module.exports.LCPArray = LCPArray;
module.exports.tagRepeatedPhrases = tagging.tagRepeats;
module.exports.naive_compress = naive_compress;
module.exports.greedy_compress = greedy_compress;
