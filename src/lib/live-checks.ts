const SITEMAP_PAGE = /<loc>([^<]+)<\/loc>/g;
const SITE_TITLE = /<title>[^<]*Agile 7<\/title>/;

export function pagesInSitemap(xml: string): string[] {
  return [...xml.matchAll(SITEMAP_PAGE)].map((match) => match[1]);
}

export function isSitePage(html: string): boolean {
  return SITE_TITLE.test(html) && html.includes('</html>');
}
