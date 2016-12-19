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

module.exports.findAllIndices = findAllIndices;
