// Longest Repeated Substring

var longestCommonPrefix =  function (i1, i2, arr) {
  // Given 2 indices for an array, find the longest common subsequence of an array.
  var l = 0;
  var offset = 0;
  var limit = arr.length - Math.max(i1, i2);
  for (var offset = 0; offset < limit; offset++) {
    if(arr[i1+offset] == arr[i2+offset]) {
      l++;
    } else {
      break;
    }
  }
  return l;
};

var findAllIndices = function(arr, elem) {
  var indices = [];
  var i = arr.indexOf(elem);
  while(i != -1) {
    indices.push(i);
    i = arr.indexOf(elem, i+1);
  }
  return indices;
}

var findTokenPositions = function(str) {
  var space_indices = findAllIndices(str, " ");
  var tokenIndices = space_indices.map(function (i) { return i+1; })
  tokenIndices.unshift(0);
  return tokenIndices;
}

var getLCPArray = function(str) {
  // Iterates through a suffix array and finds the longest common prefix.

  if (str.length === 0) {
    return [];
  }

  // Split the sentence into tokens.
  var tokenList = str.split(" ");
  if (tokenList.length <= 1) {
    return "";
  }

  // Get positions of each token in the original string.
  var positions = findTokenPositions(str);

  // Create the shuffix array by sorting it.
  var shuffixArray = Array.apply(null, Array(tokenList.length))
    .map(function (_, i) {return i;});
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
  for(var i = 1; i < shuffixArray.length; i++) {
    var sh1 = shuffixArray[i-1];
    var sh2 = shuffixArray[i];

    var tokensMatched = longestCommonPrefix(sh1, sh2, tokenList);
    var lcp = tokenList.slice(sh1, sh1+tokensMatched).join(" ");

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
