const LINK_ATTRIBUTE = /\b(?:href|src)="([^"]+)"/g;
const LEAVES_THE_SITE = /^(?:[a-z]+:|\/\/|#)/i;

export function internalLinksIn(html: string): string[] {
  return [...html.matchAll(LINK_ATTRIBUTE)].map((match) => match[1]).filter((link) => !LEAVES_THE_SITE.test(link));
}

export function resolvesIn(link: string, builtFiles: Set<string>): boolean {
  const path = link.split(/[?#]/)[0].replace(/^\//, '');
  if (path === '') return builtFiles.has('index.html');
  return builtFiles.has(path) || builtFiles.has(`${path}.html`);
}

export interface RedirectRule {
  from: string;
  to: string;
}

export function redirectRules(redirects: string): RedirectRule[] {
  return redirects
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('#'))
    .map((line) => {
      const [from, to] = line.split(/\s+/);
      return { from, to };
    });
}

export function redirectTargets(redirects: string): string[] {
  return redirectRules(redirects).map((rule) => rule.to);
}
