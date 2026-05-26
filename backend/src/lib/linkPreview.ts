import axios from "axios";
import * as cheerio from "cheerio";

export interface LinkMetadata {
  title: string;
  description: string;
  image?: string;
  url: string;
}

export const getLinkMetadata = async (url: string): Promise<LinkMetadata | null> => {
  try {
    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
      return null;
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
      timeout: 8000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500,
    });

    if (!response.data || typeof response.data !== "string") {
      return null;
    }

    const $ = cheerio.load(response.data);
    
    const getMetaTag = (name: string) => 
      $(`meta[name="${name}"]`).attr("content") || 
      $(`meta[property="${name}"]`).attr("content") ||
      $(`meta[property="og:${name}"]`).attr("content") ||
      $(`meta[name="twitter:${name}"]`).attr("content");

    const title = getMetaTag("title") || $("title").text() || url;
    const description = getMetaTag("description") || getMetaTag("og:description") || "No description available";
    const image = getMetaTag("image") || getMetaTag("og:image");

    const cleanTitle = title.trim().substring(0, 100);
    const cleanDesc = description.trim().substring(0, 200);

    return { 
      title: cleanTitle, 
      description: cleanDesc, 
      image, 
      url 
    };
  } catch (error: any) {
    console.error(`Error fetching metadata for ${url}:`, error.message);
    return null;
  }
};
