import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '../../lib/posts';
import type { ContentBlock } from '../../lib/posts';
import ImpactChart from '../../components/ImpactChart';

// ══════════════════════════════════════════════════════════════
// STATIC PARAMS
// ══════════════════════════════════════════════════════════════

export function generateStaticParams() {
  return getAllSlugs();
}

// ══════════════════════════════════════════════════════════════
// METADATA DINÁMICA
// ══════════════════════════════════════════════════════════════

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Artículo no encontrado · Don Elí' };

  return {
    title: `${post.title} · Don Elí Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

// ══════════════════════════════════════════════════════════════
// ESTILOS
// ══════════════════════════════════════════════════════════════

const ESTILOS = `
  .ap-wrap {
    --bg:   #F5E6D3;
    --cafe: #4B2C20;
    --oro:  #C59D5F;
    --bl:   #FFFFFF;
    --gris: #333333;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background-color: var(--bg);
    background-image:
      radial-gradient(ellipse at 15% 10%, rgba(197,157,95,.13) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 85%, rgba(75,44,32,.07) 0%, transparent 55%);
    color: var(--cafe);
  }

  /* ── HEADER ── */
  .ap-header {
    background: var(--cafe);
    padding: 1.6rem 1.2rem 2.2rem;
    position: relative;
    overflow: hidden;
  }
  .ap-header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(197,157,95,.18) 0%, transparent 65%);
    pointer-events: none;
  }
  .ap-nav {
    display: flex;
    align-items: center;
    gap: .5rem;
    margin-bottom: 1.2rem;
    position: relative;
    z-index: 1;
  }
  .ap-nav a {
    font-size: .65rem;
    font-weight: 600;
    letter-spacing: .06em;
    color: rgba(197,157,95,.7);
    text-decoration: none;
  }
  .ap-nav a:hover { color: var(--oro); }
  .ap-nav-sep { font-size: .6rem; color: rgba(197,157,95,.35); }
  .ap-nav-current { font-size: .65rem; color: rgba(245,230,211,.35); }

  .ap-tags {
    display: flex;
    gap: .4rem;
    flex-wrap: wrap;
    margin-bottom: .85rem;
    position: relative;
    z-index: 1;
  }
  .ap-tag {
    font-size: .57rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--oro);
    background: rgba(197,157,95,.15);
    border: 1px solid rgba(197,157,95,.3);
    border-radius: 50px;
    padding: .2rem .65rem;
  }
  .ap-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 6vw, 2.3rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1.2;
    margin-bottom: .9rem;
    position: relative;
    z-index: 1;
  }
  .ap-meta {
    display: flex;
    align-items: center;
    gap: .7rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  .ap-meta-item {
    font-size: .65rem;
    color: rgba(245,230,211,.5);
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: .25rem;
  }
  .ap-meta-item strong { color: rgba(245,230,211,.8); font-weight: 500; }
  .ap-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(197,157,95,.4); }

  /* ── CONTENIDO ── */
  .ap-body {
    max-width: 600px;
    margin: 0 auto;
    padding: 1.8rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .ap-p {
    font-size: .9rem;
    line-height: 1.85;
    color: rgba(75,44,32,.85);
  }

  .ap-h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--cafe);
    line-height: 1.25;
    padding-top: .4rem;
    border-top: 2px solid rgba(197,157,95,.2);
  }

  .ap-h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--cafe);
  }

  .ap-quote {
    background: var(--cafe);
    border-radius: 12px;
    padding: 1.2rem 1.3rem;
    position: relative;
    overflow: hidden;
  }
  .ap-quote::before {
    content: '"';
    position: absolute;
    top: -.4rem;
    left: .6rem;
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    color: rgba(197,157,95,.18);
    line-height: 1;
    pointer-events: none;
  }
  .ap-quote-text {
    font-family: 'Playfair Display', serif;
    font-size: .9rem;
    font-style: italic;
    color: var(--bg);
    line-height: 1.7;
    position: relative;
    z-index: 1;
  }
  .ap-quote-source {
    font-size: .62rem;
    color: var(--oro);
    font-weight: 500;
    margin-top: .6rem;
    font-style: normal;
    display: block;
    position: relative;
    z-index: 1;
  }

  .ap-list {
    background: var(--bl);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    border: 1px solid rgba(197,157,95,.18);
    box-shadow: 0 2px 12px rgba(75,44,32,.07);
  }
  .ap-list ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: .65rem;
    padding: 0;
    margin: 0;
  }
  .ap-list ul li {
    font-size: .82rem;
    line-height: 1.6;
    color: rgba(75,44,32,.8);
    padding-left: 1.1rem;
    position: relative;
  }
  .ap-list ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: .55rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--oro);
    flex-shrink: 0;
  }

  .ap-chart-wrap {
    background: var(--bl);
    border-radius: 16px;
    padding: 1.4rem 1.1rem;
    border: 1px solid rgba(197,157,95,.18);
    box-shadow: 0 4px 24px rgba(75,44,32,.1);
  }

  /* ── FOOTER ARTÍCULO ── */
  .ap-footer {
    margin-top: .5rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(197,157,95,.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: .75rem;
  }
  .ap-footer-back {
    display: inline-flex;
    align-items: center;
    gap: .3rem;
    font-size: .72rem;
    font-weight: 600;
    color: var(--oro);
    text-decoration: none;
    border: 1.5px solid rgba(197,157,95,.35);
    border-radius: 50px;
    padding: .38rem .9rem;
    transition: background .2s;
  }
  .ap-footer-back:hover { background: rgba(197,157,95,.1); }
  .ap-footer-note {
    font-size: .62rem;
    color: rgba(75,44,32,.35);
    font-style: italic;
  }
`;

// ══════════════════════════════════════════════════════════════
// RENDER DE BLOQUES
// ══════════════════════════════════════════════════════════════

function RenderBlock({ block, chartData }: { block: ContentBlock; chartData?: import('../../lib/posts').ChartData }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="ap-p">{block.text}</p>;

    case 'heading':
      return block.level === 2
        ? <h2 className="ap-h2">{block.text}</h2>
        : <h3 className="ap-h3">{block.text}</h3>;

    case 'quote':
      return (
        <blockquote className="ap-quote">
          <p className="ap-quote-text">{block.text}</p>
          {block.source && <cite className="ap-quote-source">— {block.source}</cite>}
        </blockquote>
      );

    case 'list':
      return (
        <div className="ap-list">
          <ul>
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      );

    case 'chart':
      if (!chartData) return null;
      return (
        <div className="ap-chart-wrap">
          <ImpactChart data={chartData} />
        </div>
      );
  }
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ══════════════════════════════════════════════════════════════
// PÁGINA
// ══════════════════════════════════════════════════════════════

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="ap-wrap">
      <style dangerouslySetInnerHTML={{ __html: ESTILOS }} />

      {/* ── HEADER ── */}
      <header className="ap-header">
        <nav className="ap-nav">
          <Link href="/">Inicio</Link>
          <span className="ap-nav-sep">›</span>
          <Link href="/blog">Blog</Link>
          <span className="ap-nav-sep">›</span>
          <span className="ap-nav-current">{post.slug}</span>
        </nav>

        <div className="ap-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="ap-tag">{tag}</span>
          ))}
        </div>

        <h1 className="ap-title">{post.title}</h1>

        <div className="ap-meta">
          <span className="ap-meta-item"><strong>{post.author}</strong></span>
          <span className="ap-meta-dot" />
          <span className="ap-meta-item">{fmtDate(post.date)}</span>
          <span className="ap-meta-dot" />
          <span className="ap-meta-item">⏱ <strong>{post.readTime} min</strong> lectura</span>
        </div>
      </header>

      {/* ── CUERPO ── */}
      <main className="ap-body">
        {post.content.map((block, i) => (
          <RenderBlock key={i} block={block} chartData={post.chartData} />
        ))}

        <div className="ap-footer">
          <Link href="/blog" className="ap-footer-back">← Volver al blog</Link>
          <span className="ap-footer-note">
            © {new Date(post.date).getFullYear()} Don Elí Brew Assistant
          </span>
        </div>
      </main>
    </div>
  );
}
