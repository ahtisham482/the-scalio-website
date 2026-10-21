import { useEffect } from "react";

const SITE_URL = "https://thescalio.com";

type PageMeta = {
  title: string;
  description: string;
  /** Path from the site root, e.g. "/services/ppc" */
  path: string;
  noindex?: boolean;
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

/** Gives each route its own title, description and canonical URL. */
export function usePageMeta({ title, description, path, noindex }: PageMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "robots", noindex ? "noindex" : "index, follow");

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = url;
  }, [title, description, path, noindex]);
}
