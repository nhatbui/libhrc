var findAllIndices = function(arr, elem) {
  var indices = [];
  var i = arr.indexOf(elem);
  while(i != -1) {
    indices.push(i);
    i = arr.indexOf(elem, i+1);
  }
  return indices;
}

var findRuns = function(pattern, doc) {
  var matches = findAllIndices(doc, pattern);

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
    for(var i = 1; i < matches.length; i++) {
      var diff = matches[i] - matches[i-1];
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

var tagRuns = function(runs, pattern, doc, showNum, multiplier, tagStart, tagEnd) {
  var lastPos = 0;
  var newDoc = '';
  for (run of runs) {
    newDoc += doc.slice(lastPos, run.start);

    if (showNum && run.count > 1) {
      newDoc += tagStart + pattern + multiplier + run.count + tagEnd + " ";
    } else {
      newDoc += pattern + " ";
    }

    lastPos = run.start + run.count*(pattern.length + 1);
  }

  if (lastPos < doc.length) {
    newDoc += doc.slice(lastPos);
  }

  return newDoc.trim();
}

var tagRepeats = function(pattern, doc, showNum, multiplier, tagStart, tagEnd) {
  var runs = findRuns(pattern, doc);
  return tagRuns(runs, pattern, doc, showNum, multiplier, tagStart, tagEnd);
}

module.exports = tagRepeats;
