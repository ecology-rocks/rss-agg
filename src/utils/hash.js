// A simple function to turn a URL into a Firestore-safe ID
export const generateArticleId = (url) => {
  if (!url) return null;
  // Encode to Base64 to handle special chars
  // Then replace '/', '+', '=' to make it URL-safe for Firestore paths
  return btoa(url)
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
    .replace(/=/g, '');
};