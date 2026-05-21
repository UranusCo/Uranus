import axios from "axios";
import * as cheerio from "cheerio";

export const getLinkMetadata = async (url) => {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 5000,
    });

    const $ = cheerio.load(html);
    
    const getMetaTag = (name) => 
      $(`meta[name="${name}"]`).attr("content") || 
      $(`meta[property="${name}"]`).attr("content") ||
      $(`meta[property="og:${name}"]`).attr("content") ||
      $(`meta[name="twitter:${name}"]`).attr("content");

    const title = getMetaTag("title") || $("title").text() || url;
    const description = getMetaTag("description") || "No description available";
    const image = getMetaTag("image");

    return { title, description, image, url };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error.message);
    return null;
  }
};
