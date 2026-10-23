import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { Resvg } from '@resvg/resvg-js';
import satori, { type Font } from 'satori';

type Section = 'writing' | 'work';

export interface ShareCard {
  section: Section;
  title: string;
}

const require = createRequire(import.meta.url);
const WIDTH = 1200;
const HEIGHT = 630;
const COLORS = { background: '#fbfaf7', text: '#1f1d1a', muted: '#57524a', accent: '#277773', brandTeal: '#43c1bb' };

export function shareCardPath(section: Section, slug: string): string {
  return `/share/${section}/${slug}.png`;
}

export async function renderShareCard(card: ShareCard): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(cardLayout(card, await brandMark()), { width: WIDTH, height: HEIGHT, fonts: await cardFonts() });
  return new Uint8Array(new Resvg(svg).render().asPng());
}

function box(style: Record<string, string | number>, children: unknown) {
  return { type: 'div', props: { style: { display: 'flex', ...style }, children } };
}

function cardLayout({ section, title }: ShareCard, mark: string) {
  return box({ width: WIDTH, height: HEIGHT, boxSizing: 'border-box', flexDirection: 'column', padding: '64px 80px', background: COLORS.background, color: COLORS.text, fontFamily: 'Inter' }, [
    box({ alignItems: 'center', gap: 16 }, [
      { type: 'img', props: { src: mark, width: 44, height: 44 } },
      box({ fontFamily: 'IBM Plex Mono', fontWeight: 500, fontSize: 28, color: COLORS.accent }, 'agile-7'),
    ]),
    box({ marginTop: 56, fontFamily: 'IBM Plex Mono', fontWeight: 500, fontSize: 24, color: COLORS.muted }, section),
    box({ marginTop: 12, flexGrow: 1, fontFamily: 'Newsreader', fontSize: 84, lineHeight: 1.08, letterSpacing: '-0.01em' }, title),
    box({ justifyContent: 'space-between', borderTop: `5px solid ${COLORS.brandTeal}`, paddingTop: 24, fontSize: 24, color: COLORS.muted }, [
      box({ fontWeight: 600, color: COLORS.text }, 'Ahmed Avais'),
      box({}, 'agile-7.com'),
    ]),
  ]);
}

async function brandMark(): Promise<string> {
  const svg = await readFile('src/assets/agile7-mark.svg', 'utf8');
  return `data:image/svg+xml;base64,${Buffer.from(svg.replace('currentColor', COLORS.brandTeal)).toString('base64')}`;
}

async function cardFonts(): Promise<Font[]> {
  const font = async (name: string, file: string, weight: Font['weight']): Promise<Font> => ({ name, weight, data: await readFile(file) });
  return Promise.all([
    font('Newsreader', require.resolve('@fontsource/newsreader/files/newsreader-latin-400-normal.woff'), 400),
    font('Inter', require.resolve('@fontsource/inter/files/inter-latin-400-normal.woff'), 400),
    font('Inter', require.resolve('@fontsource/inter/files/inter-latin-600-normal.woff'), 600),
    font('IBM Plex Mono', require.resolve('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff'), 500),
  ]);
}
