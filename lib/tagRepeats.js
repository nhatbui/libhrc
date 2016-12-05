var tagRepeats = function(pattern, doc, tag=true, multiplier=' x', tagStart='<', tagEnd='> ') {
  // Using Rabin Karp, find the pattern in the document and tag each
  // repeated instance of the pattern.
  var hash = {};
  hash[pattern] = true; // TODO: needs to be a rolling hash!
  var count = 0;
  var newDoc = "";
  var foundInstance = false;
  var idx = 0;
  for (;idx <= doc.length - pattern.length;) {
    var checkSubstring = doc.slice(idx, idx + pattern.length);
    var match = checkSubstring in hash;
    if(match) {
      // if this is the 2nd or more occurrence...
      // ...don't add to new str.
      count += 1;
      foundInstance = true;
      idx += pattern.length + 1;
    } else {
      if(count > 1 && foundInstance && tag) {
        // The end of a repeated match.
        newDoc += tagStart + pattern + multiplier + count + tagEnd;
      } else if(foundInstance) {
        // One match
        newDoc += pattern;
      }
      newDoc += doc[idx];
      count = 0;
      foundInstance = false;
      idx++;
    }
  }

  if(count > 1 && foundInstance && tag) {
    // The end of a repeated match.
    newDoc += tagStart + pattern + multiplier + count + tagEnd;
  } else if(foundInstance) {
    // One match
    newDoc += pattern;
  }

  return newDoc.trim();
};

module.exports = tagRepeats;
