import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog · Don Elí Brew Assistant',
  description: 'Análisis de mercado, logística y cultura cafetera de especialidad colombiana.',
};

const ESTILOS = `
  .bl-wrap {
    --bg:   #F5E6D3;
    --cafe: #4B2C20;
    --oro:  #C59D5F;
    --bl:   #FFFFFF;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background-color: var(--bg);
    background-image:
      radial-gradient(ellipse at 15% 10%, rgba(197,157,95,.13) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 85%, rgba(75,44,32,.07) 0%, transparent 55%);
    color: var(--cafe);
  }

  /* ── HEADER ── */
  .bl-header {
    background: var(--cafe);
    padding: 2rem 1.2rem 2.4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .bl-header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(197,157,95,.2) 0%, transparent 65%);
    pointer-events: none;
  }
  .bl-h-eye {
    font-size: .6rem;
    font-weight: 600;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .4rem;
  }
  .bl-h-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 7vw, 3rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1.15;
  }
  .bl-h-title em { color: var(--oro); font-style: italic; }
  .bl-h-sub {
    font-size: .78rem;
    font-weight: 300;
    color: rgba(245,230,211,.5);
    margin-top: .5rem;
  }
  .bl-h-line { width: 42px; height: 2px; background: var(--oro); margin: .9rem auto 0; border-radius: 2px; }
  .bl-back {
    display: inline-flex;
    align-items: center;
    gap: .3rem;
    font-size: .68rem;
    font-weight: 600;
    color: rgba(197,157,95,.75);
    text-decoration: none;
    letter-spacing: .06em;
    margin-bottom: .8rem;
    position: relative;
    z-index: 1;
  }
  .bl-back:hover { color: var(--oro); }

  /* ── MAIN ── */
  .bl-main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1.6rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bl-section-label {
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(75,44,32,.45);
    margin-bottom: .2rem;
  }

  /* ── TARJETA DE ARTÍCULO ── */
  @keyframes blFadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .bl-card {
    background: var(--bl);
    border-radius: 16px;
    padding: 1.4rem;
    box-shadow: 0 4px 24px rgba(75,44,32,.1);
    border: 1px solid rgba(197,157,95,.15);
    text-decoration: none;
    display: block;
    transition: transform .22s, box-shadow .22s;
    animation: blFadeUp .45s ease both;
  }
  .bl-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(75,44,32,.18);
  }
  .bl-card-tags {
    display: flex;
    gap: .4rem;
    flex-wrap: wrap;
    margin-bottom: .7rem;
  }
  .bl-tag {
    font-size: .57rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--oro);
    background: rgba(197,157,95,.12);
    border: 1px solid rgba(197,157,95,.3);
    border-radius: 50px;
    padding: .18rem .6rem;
  }
  .bl-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.08rem;
    font-weight: 700;
    color: var(--cafe);
    line-height: 1.35;
    margin-bottom: .6rem;
  }
  .bl-card-excerpt {
    font-size: .8rem;
    color: rgba(75,44,32,.65);
    line-height: 1.65;
    margin-bottom: .9rem;
  }
  .bl-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    padding-top: .85rem;
    border-top: 1px solid rgba(197,157,95,.15);
  }
  .bl-meta-left {
    display: flex;
    flex-direction: column;
    gap: .1rem;
  }
  .bl-meta-author { font-size: .68rem; font-weight: 600; color: var(--cafe); }
  .bl-meta-date   { font-size: .62rem; color: rgba(75,44,32,.4); }
  .bl-meta-read {
    display: flex;
    align-items: center;
    gap: .25rem;
    font-size: .62rem;
    font-weight: 600;
    color: var(--oro);
    background: rgba(197,157,95,.1);
    padding: .28rem .65rem;
    border-radius: 50px;
    border: 1px solid rgba(197,157,95,.25);
    flex-shrink: 0;
  }

  /* ── EMPTY ── */
  .bl-empty {
    text-align: center;
    padding: 3rem 1rem;
    color: rgba(75,44,32,.4);
    font-size: .85rem;
  }
`;

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bl-wrap">
      <style dangerouslySetInnerHTML={{ __html: ESTILOS }} />

      <header className="bl-header">
        <Link href="/" className="bl-back">← Volver a la calculadora</Link>
        <p className="bl-h-eye">☕ Don Elí · Santander, Colombia</p>
        <h1 className="bl-h-title">El <em>Blog</em> del Café</h1>
        <p className="bl-h-sub">Mercado · Logística · Cultura cafetera de especialidad</p>
        <div className="bl-h-line" />
      </header>

      <main className="bl-main">
        {posts.length === 0 ? (
          <div className="bl-empty">No hay artículos publicados aún.</div>
        ) : (
          <>
            <p className="bl-section-label">{posts.length} artículo{posts.length !== 1 ? 's' : ''}</p>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bl-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="bl-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bl-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="bl-card-title">{post.title}</h2>
                <p className="bl-card-excerpt">{post.excerpt}</p>
                <div className="bl-card-meta">
                  <div className="bl-meta-left">
                    <span className="bl-meta-author">{post.author}</span>
                    <span className="bl-meta-date">{fmtDate(post.date)}</span>
                  </div>
                  <span className="bl-meta-read">⏱ {post.readTime} min lectura</span>
                </div>
              </Link>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
