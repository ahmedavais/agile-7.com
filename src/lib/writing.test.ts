import { describe, expect, it } from 'vitest';
import { newestFirst } from './writing';

const postFrom = (title: string, date: string) => ({ data: { title, date: new Date(date) } });

describe('newestFirst', () => {
  it('has nothing to read when there are no posts', () => {
    const posts: never[] = [];

    const readingList = newestFirst(posts);

    expect(readingList).toEqual([]);
  });

  it('puts the newest post first', () => {
    const posts = [
      postFrom('Pattern Spotting Super Powers', '2020-05-04'),
      postFrom('Beginning and Ending with Gratitude, Part 2', '2020-07-24'),
      postFrom('Beginning and Ending with Gratitude', '2020-04-18'),
    ];

    const readingList = newestFirst(posts);

    expect(readingList.map((post) => post.data.title)).toEqual([
      'Beginning and Ending with Gratitude, Part 2',
      'Pattern Spotting Super Powers',
      'Beginning and Ending with Gratitude',
    ]);
  });

  it('leaves the original posts in their order', () => {
    const posts = [postFrom('Older', '2020-04-18'), postFrom('Newer', '2020-07-24')];

    newestFirst(posts);

    expect(posts.map((post) => post.data.title)).toEqual(['Older', 'Newer']);
  });
});
