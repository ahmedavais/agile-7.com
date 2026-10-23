const META_DESCRIPTION = /<meta name="description" content="([^"]*)"/;
const SHARE_IMAGE = /<meta property="og:image" content="([^"]*)"/;

export function descriptionOf(html: string): string | undefined {
  return META_DESCRIPTION.exec(html)?.[1];
}

export function shareImageOf(html: string): string | undefined {
  return SHARE_IMAGE.exec(html)?.[1];
}
