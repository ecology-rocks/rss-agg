import { describe, it, expect } from 'vitest';
import { generateArticleId } from '../hash';

describe('Hash Utility', () => {
  it('generates consistent IDs for the same URL', () => {
    const url = 'https://example.com/article/123';
    const id1 = generateArticleId(url);
    const id2 = generateArticleId(url);
    
    expect(id1).toBe(id2);
  });

  it('handles special characters safely', () => {
    // These chars often break Firestore paths if not encoded
    const trickyUrl = 'https://example.com/?q=hello+world&lang=en';
    const id = generateArticleId(trickyUrl);
    
    // Ensure no forbidden Firestore chars in the output
    expect(id).not.toContain('/');
    expect(id).not.toContain('.'); 
    expect(id).not.toContain('#');
  });

  it('generates different IDs for different URLs', () => {
    const url1 = 'https://example.com/1';
    const url2 = 'https://example.com/2';
    
    expect(generateArticleId(url1)).not.toBe(generateArticleId(url2));
  });

  it('returns null for empty input', () => {
    expect(generateArticleId(null)).toBe(null);
    expect(generateArticleId('')).toBe(null);
  });
});