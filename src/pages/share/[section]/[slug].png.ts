import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderShareCard, type ShareCard } from '../../../lib/share-card';

interface Props {
  card: ShareCard;
}

export const getStaticPaths = (async () => {
  const posts = await getCollection('writing');
  const stories = await getCollection('work');
  const cardFor = (section: ShareCard['section'], entry: { id: string; data: { title: string } }) => ({
    params: { section, slug: entry.id },
    props: { card: { section, title: entry.data.title } },
  });
  return [...posts.map((post) => cardFor('writing', post)), ...stories.map((story) => cardFor('work', story))];
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) =>
  new Response(await renderShareCard(props.card), { headers: { 'Content-Type': 'image/png' } });
