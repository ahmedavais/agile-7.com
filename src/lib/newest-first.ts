interface Dated {
  data: { date: Date };
}

export function newestFirst<Post extends Dated>(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
