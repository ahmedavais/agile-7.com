const META_DESCRIPTION = /<meta name="description" content="([^"]*)"/;

export function descriptionOf(html: string): string | undefined {
  return META_DESCRIPTION.exec(html)?.[1];
}
