export const parseOPML = (xmlText) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  // Find all outline elements that have an xmlUrl attribute (standard for RSS)
  const outlines = xmlDoc.querySelectorAll("outline[xmlUrl]");
  
  // Extract URLs and remove duplicates/empties
  const urls = Array.from(outlines)
    .map(node => node.getAttribute("xmlUrl"))
    .filter(url => url);

  return [...new Set(urls)];
};

export const downloadOPML = (feeds) => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
  <head>
    <title>Policy Stream Feeds</title>
  </head>
  <body>
    ${feeds.map(url => `<outline type="rss" text="${url}" xmlUrl="${url}"/>`).join('\n    ')}
  </body>
</opml>`;

  const blob = new Blob([xmlContent], { type: 'text/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'feeds.opml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};