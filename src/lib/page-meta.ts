const META_DESCRIPTION = /<meta name="description" content="([^"]*)"/;
const SHARE_IMAGE = /<meta property="og:image" content="([^"]*)"/;
const SHARED_URL = /<meta property="og:url" content="([^"]*)"/;

export function descriptionOf(html: string): string | undefined {
  return META_DESCRIPTION.exec(html)?.[1];
}

export function shareImageOf(html: string): string | undefined {
  return SHARE_IMAGE.exec(html)?.[1];
}

export function sharedUrlOf(html: string): string | undefined {
  return SHARED_URL.exec(html)?.[1];
}
