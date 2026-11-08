const SITEMAP_PAGE = /<loc>([^<]+)<\/loc>/g;
const SITE_TITLE = /<title>[^<]*Agile 7<\/title>/;
const PAGE_LOAD = 1;
const REPORT_TAKEN = 204;
const WEB_ANALYTICS_BEACON = /data-cf-beacon='([^']+)'/;

export function pagesInSitemap(xml: string): string[] {
  return [...xml.matchAll(SITEMAP_PAGE)].map((match) => match[1]);
}

export function isSitePage(html: string): boolean {
  return SITE_TITLE.test(html) && html.includes('</html>');
}

export function analyticsTokenIn(html: string): string | undefined {
  const settings = WEB_ANALYTICS_BEACON.exec(html)?.[1];
  return settings && (JSON.parse(settings) as { token: string }).token;
}

export function visitReport(siteToken: string, location: string): string {
  return JSON.stringify({ siteToken, location, eventType: PAGE_LOAD });
}

export function isAcceptedReport(status: number): boolean {
  return status === REPORT_TAKEN;
}
