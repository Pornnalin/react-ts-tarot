import { useEffect } from "react";

const SITE_URL = "https://tarotwhisper.netlify.app";
const SITE_NAME = "Tarot Whisper";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);
  }, [title, description, path]);

  // Fires once per route change, not on every title/description update
  // (e.g. DetailTarotCard's description loads async after mount).
  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_title: title,
      page_location: `${SITE_URL}${path}`,
      page_path: path,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
}
