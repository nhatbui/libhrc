var findAllIndices = function(arr, elem) {
  var indices = [];
  var i = arr.indexOf(elem);
  while(i != -1) {
    indices.push(i);
    i = arr.indexOf(elem, i+1);
  }
  return indices;
}

var tagRepeats = function(pattern, doc, tag=true, multiplier=' x', tagStart='<', tagEnd='> ') {
  // Using Rabin Karp, find the pattern in the document and tag each
  // repeated instance of the pattern.
  //console.log(pattern);
  var matches = findAllIndices(doc, pattern);
  //console.log(matches);

  // 3 things can happen:
  // - 1 match.
  //   - just return doc. No change.
  // - multiple matches.
  //   - compress only repeats
  // - no matches.
  //   - just return doc. No change.
  if (matches.length === 0 || matches.length === 1) {
    return doc;
  } else {
    // collect "runs"
    // Populate the new string up until the first match
    var newDoc = doc.slice(0, matches[0]);

    var runStart = matches[0];
    var runCount = 1;
    for(var i = 1; i < matches.length; i++) {
      var diff = matches[i] - matches[i-1];
      if (diff === (pattern.length + 1)) {
        // Continue the run
        runCount++;
      } else {
        if (runCount > 1 && tag) {
          // If run longer than 1, print the count.
          newDoc += tagStart + pattern + multiplier + runCount + tagEnd;
        } else {
          // Don't print the count.
          newDoc += pattern + ' ';
        }
        // Print characters not part of the pattern up until the next match.
        newDoc += doc.slice(matches[i-1]+pattern.length+1, matches[i]);
        runStart = matches[i];
        runCount = 1;
      }
    }
  }

  // Check if we left a run that continued to the end of the string.
  if (runCount > 1 && tag) {
    newDoc += tagStart + pattern + multiplier + runCount + tagEnd;
  } else {
    newDoc += pattern;
  }
  // Print characters not part of the pattern up until the end of the doc
  newDoc += doc.slice(matches[matches.length - 1]+pattern.length+1);

  return newDoc.trim();
};

module.exports = tagRepeats;
