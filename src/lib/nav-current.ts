type NavCurrent = 'page' | 'true' | undefined;

export function navCurrent(section: string, page: string): NavCurrent {
  if (page === section) return 'page';
  return page.startsWith(`${section}/`) ? 'true' : undefined;
}
