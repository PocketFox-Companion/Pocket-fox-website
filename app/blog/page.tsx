import { pageMeta } from '@/lib/meta';
import { posts } from '@/lib/posts';
import { categories } from '@/lib/site';
import { PostList } from '@/components/post-list';
export const metadata = pageMeta(
  'The PocketFox journal',
  'Perspectives, product notes, and educational reading from PocketFox.',
  '/blog/',
);
export default function Blog() {
  return (
    <>
      <header className="page-head wrap">
        <p className="eyebrow">The PocketFox journal</p>
        <h1>
          Room for
          <br />
          <em>a different perspective.</em>
        </h1>
        <p className="lede">
          A reading space for thoughtful perspectives and practical notes about
          PocketFox.
        </p>
      </header>
      <section className="wrap section">
        <nav className="category-list" aria-label="Article categories">
          {categories.map((c) => (
            <a href={'/category/' + c.slug + '/'} key={c.slug}>
              {c.name}
            </a>
          ))}
        </nav>
        <PostList posts={posts} />
      </section>
    </>
  );
}
