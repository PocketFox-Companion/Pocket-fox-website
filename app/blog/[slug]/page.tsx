import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import { pageMeta } from '@/lib/meta';
import { origin, categories } from '@/lib/site';
import { markdown } from '@/lib/markdown.mjs';
import { PostList } from '@/components/post-list';
import {Art} from '@/components/art';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) return {};
  const m = pageMeta(
    p.seoTitle || p.title,
    p.description || p.excerpt,
    '/blog/' + p.slug + '/',
  );
  return {
    ...m,
    alternates: { canonical: p.canonical || origin + '/blog/' + p.slug + '/' },
    openGraph: {
      ...m.openGraph,
      type: 'article',
      publishedTime: p.date,
      modifiedTime: p.updated || p.date,
      images: p.socialImage ? [origin + p.socialImage] : [],
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  const c = categories.find((c) => c.slug === p.category);
  const related = posts
    .filter(
      (q) =>
        q.slug !== slug &&
        (p.related.length
          ? p.related.includes(q.slug)
          : q.category === p.category),
    )
    .slice(0, 3);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { '@type': 'Person', name: p.author },
    mainEntityOfPage: p.canonical || origin + '/blog/' + p.slug + '/',
  };
  return (
    <>
      <header className="page-head wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a> / <a href="/blog/">Journal</a> /{' '}
          <a href={'/category/' + p.category + '/'}>{c?.name}</a>
        </nav>
        <p className="eyebrow">{c?.name}</p>
        <h1>{p.title}</h1>
        <p className="lede">{p.excerpt}</p>
        <p className="article-meta">
          By {p.author} · <time dateTime={p.date}>{p.date}</time>
          {p.updated && ' · Updated ' + p.updated}
        </p>
        {p.reviewer && <p className="article-meta">Reviewed by {p.reviewer}</p>}
      </header>
      <article className="prose">
        {p.heroImage && (
          <Art
            src={p.heroImage}
            dark={p.heroImageDark}
            alt={p.heroAlt || ''}
          />
        )}
        {p.contentNote && <p className="content-note">{p.contentNote}</p>}
        <div dangerouslySetInnerHTML={{ __html: markdown(p.body) }} />
        {p.references.length > 0 && (
          <section>
            <h2>Sources & further reading</h2>
            <ul>
              {p.references.map((r) => (
                <li key={r.url}>
                  <a href={r.url} rel="noreferrer">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      {related.length > 0 && (
        <section className="wrap section">
          <h2>Related reading</h2>
          <PostList posts={related} />
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
