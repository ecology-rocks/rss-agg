// src/utils/feedProcessor.js

export const parseXML = (xmlText, sourceUrl) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  const items = xmlDoc.querySelectorAll("item");
  const channelTitle = xmlDoc.querySelector("channel > title")?.textContent || sourceUrl;

  return Array.from(items).map(item => ({
    title: item.querySelector("title")?.textContent || "No Title",
    link: item.querySelector("link")?.textContent,
    pubDate: new Date(item.querySelector("pubDate")?.textContent),
    description: item.querySelector("description")?.textContent?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
    source: channelTitle,
    sourceUrl: sourceUrl,
    id: item.querySelector("guid")?.textContent || item.querySelector("link")?.textContent
  }));
};

export const autoCategorize = (items, categories) => {
  if (!categories || !categories.length) return items;

  return items.map(item => {
    const itemText = (item.title + ' ' + item.description).toLowerCase();
    
    const matchedCats = categories
      .filter(cat => cat.keywords.some(k => itemText.includes(k.toLowerCase())))
      .map(cat => cat.name);
    
    return { ...item, categories: matchedCats };
  });
};