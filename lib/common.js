/**
 * Find indices of all occurance of elem in arr. Uses 'indexOf'.
 * @param {array} arr - Array-like element (works with strings too!).
 * @param {array_element} elem - Element to search for in arr.
 * @return {array} indices - Array of indices where elem occurs in arr.
 */
var findAllIndices = function(arr, elem) {
  var indices = [];
  var i = arr.indexOf(elem);
  while (i != -1) {
    indices.push(i);
    i = arr.indexOf(elem, i + 1);
  }
  return indices;
};

/**
 * Find indices of all matches of Regex pattern in str.
 * @param {string} str - string to find Regex patterns in.
 * @param {RegExp} re - Regex patterns
 * @return {array} Array of indices where Regex pattern occurs in str.
 */
var findAllIndicesRegex = function(str, re) {
  var indices = [];
  var m = re.exec(str);
  while (m) {
    indices.push(m.index);
    m = re.exec(str);
  }
  return indices;
};

module.exports.findAllIndices = findAllIndices;
module.exports.findAllIndicesRegex = findAllIndicesRegex;
