var common = require('../lib/common.js');

/**
 * Find all "runs" of 'pattern' in 'doc'. Runs are sequential repeats.
 * A run is an object with the following keys:
 * 'start': index of start of run.
 * 'count': number of sequential repeats of the string.
 * @param {string} pattern - String to find runs of within doc.
 * @param {int} doc - String to find runs of 'pattern' within.
 * @param {string} delimiter - String which delimits tokens
 * @return {array} runs - Array of runs.
 */
var findRuns = function(pattern, doc, delimiter) {
  // all matches must be followed by a whitespace or end of the string.
  // NOTE: We tokenized on single-space. Will the mismatch lead to funkiness?
  var regexPattern = new RegExp(pattern + '(' + delimiter + '|$)', 'g');;
  var matches = common.findAllIndicesRegex(doc, regexPattern);

  // Returned structure:
  // list of tuples where each tuple is the start of the run and the number
  // of times that run is repeated.
  if (matches.length === 0) {
    return doc;
  } else if (matches.length === 1) {
    return [{start: matches[0], count: 1}];
  } else {
    // collect "runs"
    var runs = [];
    var runStart = matches[0];
    var runCount = 1;
    for (var i = 1; i < matches.length; i++) {
      var diff = matches[i] - matches[i - 1];
      // +1 is important! Assume patterns are delimited by a space!
      if (diff === (pattern.length + 1)) {
        // Continue the run
        runCount++;
      } else {
        // Log the run.
        runs.push({start: runStart, count: runCount});

        // Restart run counting
        runStart = matches[i];
        runCount = 1;
      }
    }
    // State:
    // - The last run is never logged.
    //    - If there's one run, it still hasn't been logged.
    // - for n number of runs where n > 1, the last is not printed so we better
    //   make sure we handle it outside of this for loop.
    runs.push({start: runStart, count: runCount});
  }

  return runs;
};

/**
 * Replace sequential repeats, runs, by one instance of the pattern.
 * Optionally, add styling to all reduced runs.
 * @param {array} runs - Array of runs.
 * @param {string} pattern - String whose repeated pattern occurs in doc.
 * @param {string} doc - String containing runs of pattern.
 * @param {string} delimiter - String separating tokens.
 * @param {boolean} showNum - Flag to show number of repeats.
 * @param {string} multiplier - String to show before number of repeats.
 * @param {string} tagStart - String to show before start of run.
 * @param {string} tagEnd - String to show at the end of run.
 * @return {string} newDoc - String whose runs have been compressed to one
 * instance of the repeated pattern.
 */
var tagRuns = function(runs, pattern, doc, delimiter, showNum,
                       multiplier, tagStart, tagEnd) {
  var lastPos = 0;
  var newDoc = '';
  for (run of runs) {
    newDoc += doc.slice(lastPos, run.start);

    if (showNum && run.count > 1) {
      newDoc += tagStart + pattern + multiplier + run.count + tagEnd + delimiter;
    } else {
      newDoc += pattern + delimiter;
    }

    lastPos = run.start + run.count * (pattern.length + 1);
  }

  if (lastPos < doc.length) {
    newDoc += doc.slice(lastPos);
  }

  return newDoc.trim();
};

/**
 * Replace sequential repeats, runs, by one instance of the pattern.
 * Optionally, add styling to all reduced runs.
 * @param {string} pattern - String whose repeated pattern occurs in doc.
 * @param {string} doc - String containing runs of pattern.
 * @param {string} delimiter - String that separates tokens.
 * @param {boolean} showNum - Flag to show number of repeats.
 * @param {string} multiplier - String to show before number of repeats.
 * @param {string} tagStart - String to show before start of run.
 * @param {string} tagEnd - String to show at the end of run.
 * @return {string} newDoc - String whose runs have been compressed to one
 * instance of the repeated pattern.
 */
var tagRepeats = function(pattern, doc, delimiter, showNum, multiplier, tagStart, tagEnd) {
  var runs = findRuns(pattern, doc, delimiter);
  return tagRuns(runs, pattern, doc, delimiter, showNum, multiplier, tagStart, tagEnd);
};

module.exports = tagRepeats;
