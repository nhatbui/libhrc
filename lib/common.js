/**
 * For str, escape all what are otherwise special regex chars.
 * Ref: http://stackoverflow.com/a/6969486
 * @param {string} str - String whose characters are escaped if they are also
 * regex special/reserved characters.
 * @return {string} resulting string with escaped characters if they are regex
 * special/reserved characters.
 */
var escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

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

/**
 * Replace characters in range with another character.
 * @param {string} str - string with a range of characters to be replaced.
 * @param {int} start - position in string for start of range (inclusive).
 * @param {int} end - position in string for end of range (exclusive).
 * @param {string} nullChar - character to replace characters in range.
 * @return {string} New string whose range have been replaced with instances of nullChar.
 */
var nullOutChars = function(str, start, end, nullChar) {
  return str.slice(0, start) + nullChar.repeat(end - start) + str.slice(end);
};

module.exports.findAllIndices = findAllIndices;
module.exports.findAllIndicesRegex = findAllIndicesRegex;
module.exports.nullOutChars = nullOutChars;
module.exports.escapeRegExp = escapeRegExp;
