import { notFound } from 'next/navigation';
import { categories } from '@/lib/site';
import { posts } from '@/lib/posts';
import { pageMeta } from '@/lib/meta';
import { PostList } from '@/components/post-list';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  return c
    ? pageMeta(
        c.name,
        'PocketFox articles in ' + c.name + '.',
        '/category/' + c.slug + '/',
      )
    : {};
}
export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <>
      <header className="page-head wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a> / <a href="/blog/">Journal</a> / {c.name}
        </nav>
        <p className="eyebrow">From the journal</p>
        <h1>{c.name}</h1>
      </header>
      <section className="wrap section">
        <PostList posts={posts.filter((p) => p.category === slug)} />
      </section>
    </>
  );
}
