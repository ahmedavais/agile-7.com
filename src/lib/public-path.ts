export function publicPath(builtPath: string): string {
  return builtPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
}
