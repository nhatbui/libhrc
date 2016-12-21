var common = require('../lib/common.js');

/**
 * Given two indices for the same array, find the
 * longest commom subsequence (LCS)  of the array.
 * @param {int} i1 - The index of the first subsequence.
 * @param {int} i2 - The index of the second subsequence.
 * @param {array} arr - Array.
 * @return {int} l - Length of LCS
 */
var longestCommonPrefix = function(i1, i2, arr) {
  var l = 0;
  var offset = 0;
  var limit = arr.length - Math.max(i1, i2);
  for (var offset = 0; offset < limit; offset++) {
    if (arr[i1 + offset] == arr[i2 + offset]) {
      l++;
    } else {
      break;
    }
  }
  return l;
};

/**
 * Finds positions of tokens in string.
 * @param {string} str - String.
 * @param {string} splitOn - String separating tokens.
 * @return {array} Array of token positions.
 */
var findTokenPositions = function(str, splitOn) {
  var space_indices = common.findAllIndices(str, splitOn);
  var tokenIndices = space_indices.map(function(i) { return i + 1; });
  tokenIndices.unshift(0);
  return tokenIndices;
};

/**
 * Finds LCS between consecutive shuffixes.
 * @param {string} str - String to find LCSs in.
 * @param {string} splitOn - String to split tokens on.
 * @return {array} Array of LCS between shuffixes.
 */
var getLCPArray = function(str, splitOn) {
  if (str.length === 0) {
    return [];
  }

  // Split the sentence into tokens.
  var tokenList = str.split(splitOn);
  if (tokenList.length <= 1) {
    return '';
  }

  // Get positions of each token in the original string.
  var positions = findTokenPositions(str, splitOn);

  // Create the shuffix array by sorting it.
  var shuffixArray = Array.apply(null, Array(tokenList.length))
    .map(function(_, i) {return i;});
  shuffixArray.sort(function(a, b) {
    var s1 = tokenList.slice(a);
    var s2 = tokenList.slice(b);
    if (s1 < s2) {
      return -1;
    } else if (s1 > s2) {
      return 1;
    } else {
      return 0;
    }
  });

  // Build LCP array (longest common prefix)
  var lcp_array = [];
  for (var i = 1; i < shuffixArray.length; i++) {
    var sh1 = shuffixArray[i - 1];
    var sh2 = shuffixArray[i];

    var tokensMatched = longestCommonPrefix(sh1, sh2, tokenList);
    var lcp = tokenList.slice(sh1, sh1 + tokensMatched).join(splitOn);

    if (lcp.length > 0) {
      lcp_array.push(lcp);
    }
  }

  lcp_array.sort(function(a, b) {
    if (a.length < b.length) {
      return -1;
    } else if (a.length > b.length) {
      return 1;
    } else {
      return 0;
    }
  });

  return lcp_array;
};

module.exports = getLCPArray;
