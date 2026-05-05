/**
 * Simple client-side translation utility using a free Google Translate proxy.
 * Note: For production, consider a paid API like Google Cloud Translation or DeepL.
 */
export async function translateText(text: string, to: string = 'ar'): Promise<string> {
  if (!text) return '';
  
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    if (!response.ok) throw new Error('Translation failed');
    
    const data = await response.json();
    
    // Google Translate API returns a nested array where data[0] contains the translated segments
    return data[0].map((segment: any) => segment[0]).join('');
  } catch (error) {
    console.error('Translation Error:', error);
    return text; // Fallback to original text
  }
}
