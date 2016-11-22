var tagRepeats = function(pattern, doc, tag=true, multiplier=' x', tagStart='<', tagEnd='>') {
  // Using Rabin Karp, find the pattern in the document and tag each
  // repeated instance of the pattern.
  var re = new RegExp(pattern, 'g');
  var count = 0;
  var matchIndex = [];

  while ((match = re.exec(doc)) != null) {
    // We assume that the matches are consecutive a la suffix array routine
    // earlier.
    count += 1;
    matchIndex.push(match.index);
  }

  if (count > 1) {
    var newDoc = doc.slice(0, matchIndex[0]);

    if (tag) {
      newDoc += tagStart + pattern + multiplier + count + tagEnd;
    } else {
      newDoc += pattern;
    }

    newDoc += doc.slice(
      matchIndex[matchIndex.length - 1] + pattern.length,
      doc.length
    );
    return newDoc;
  } else {
    return _document;
  }
};

module.exports = tagRepeats;
