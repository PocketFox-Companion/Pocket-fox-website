import { Post } from '@/lib/posts';
import { categories } from '@/lib/site';
export function PostList({ posts }: { posts: Post[] }) {
  return posts.length ? (
    <div className="feature-grid">
      {posts.map((p) => (
        <a className="article-card" key={p.slug} href={'/blog/' + p.slug + '/'}>
          {p.heroImage && (
            <img
              src={p.heroImage}
              alt={p.heroAlt || ''}
              width="600"
              height="400"
              loading="lazy"
            />
          )}
          <p className="eyebrow">
            {categories.find((c) => c.slug === p.category)?.name}
          </p>
          <h2>{p.title}</h2>
          <p>{p.excerpt}</p>
          <span className="article-meta">
            {p.date} · {p.author}
          </span>
        </a>
      ))}
    </div>
  ) : (
    <div className="blog-empty">
      <p className="eyebrow">In the making</p>
      <h2>Good things take a little space.</h2>
      <p>
        There are no published articles here yet. We’re preparing this reading
        space with care.
      </p>
      <a className="text-link" href="/about/">
        Get to know PocketFox →
      </a>
    </div>
  );
}
