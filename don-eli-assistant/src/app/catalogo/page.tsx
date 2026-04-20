'use client';

import { useState } from 'react';
import Link from 'next/link';
import catalogo from '@/data/catalogo.json';

type Proceso = 'Todos' | 'Natural' | 'Lavado';

interface Cafe {
  id: number;
  nombre: string;
  proceso: string;
  origen: string;
  altitud: string | null;
  emoji: string;
  perfil: string;
  precio500g_cop: number;
  precio500g_usd: number;
  precioKilo_cop: number;
  precioKilo_usd: number;
  disponible: boolean;
  badge: string | null;
}

const cafes = catalogo as Cafe[];

function fmtCOP(n: number) {
  return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function waLink(_nombre: string) {
  return 'https://wa.link/spv1dd';
}

const ESTILOS = `
  .cat-wrap {
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
  .cat-header {
    background: var(--cafe);
    padding: 2rem 1.2rem 2.4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cat-header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(197,157,95,.2) 0%, transparent 65%);
    pointer-events: none;
  }
  .cat-back {
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
  .cat-back:hover { color: var(--oro); }
  .cat-h-eye {
    font-size: .6rem;
    font-weight: 600;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .4rem;
    position: relative;
    z-index: 1;
  }
  .cat-h-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 7vw, 3rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1.15;
    position: relative;
    z-index: 1;
  }
  .cat-h-title em { color: var(--oro); font-style: italic; }
  .cat-h-sub {
    font-size: .78rem;
    font-weight: 300;
    color: rgba(245,230,211,.5);
    margin-top: .5rem;
    position: relative;
    z-index: 1;
  }
  .cat-h-line { width: 42px; height: 2px; background: var(--oro); margin: .9rem auto 0; border-radius: 2px; position: relative; z-index: 1; }

  /* ── TRM NOTA ── */
  .cat-trm {
    background: rgba(197,157,95,.12);
    border: 1px solid rgba(197,157,95,.3);
    border-radius: 10px;
    padding: .65rem 1rem;
    font-size: .72rem;
    color: rgba(75,44,32,.7);
    text-align: center;
    line-height: 1.6;
  }
  .cat-trm strong { color: var(--cafe); font-weight: 700; }

  /* ── FILTROS ── */
  .cat-filtros {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .cat-filtro-btn {
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    border-radius: 50px;
    padding: .4rem 1.1rem;
    border: 1.5px solid rgba(197,157,95,.4);
    background: transparent;
    color: rgba(75,44,32,.6);
    cursor: pointer;
    transition: all .18s;
  }
  .cat-filtro-btn:hover {
    border-color: var(--oro);
    color: var(--cafe);
  }
  .cat-filtro-btn.activo {
    background: var(--cafe);
    border-color: var(--cafe);
    color: var(--bg);
  }

  /* ── MAIN ── */
  .cat-main {
    max-width: 640px;
    margin: 0 auto;
    padding: 1.4rem 1rem 3.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cat-count {
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(75,44,32,.45);
  }

  /* ── TARJETA ── */
  @keyframes catFadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .cat-card {
    background: var(--bl);
    border-radius: 18px;
    padding: 1.3rem 1.3rem 1.1rem;
    box-shadow: 0 4px 24px rgba(75,44,32,.09);
    border: 1px solid rgba(197,157,95,.15);
    animation: catFadeUp .4s ease both;
    position: relative;
    overflow: hidden;
  }
  .cat-card.agotado { opacity: .55; }

  .cat-card-top {
    display: flex;
    align-items: flex-start;
    gap: .9rem;
    margin-bottom: .8rem;
  }
  .cat-emoji {
    font-size: 2rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .cat-card-info { flex: 1; min-width: 0; }

  .cat-badges {
    display: flex;
    gap: .35rem;
    flex-wrap: wrap;
    margin-bottom: .3rem;
  }
  .cat-badge {
    font-size: .55rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: .15rem .55rem;
    border-radius: 50px;
  }
  .cat-badge-premium {
    background: rgba(197,157,95,.18);
    color: var(--oro);
    border: 1px solid rgba(197,157,95,.4);
  }
  .cat-badge-local {
    background: rgba(75,44,32,.08);
    color: var(--cafe);
    border: 1px solid rgba(75,44,32,.2);
  }
  .cat-badge-proceso {
    background: rgba(75,44,32,.06);
    color: rgba(75,44,32,.55);
    border: 1px solid rgba(75,44,32,.12);
  }
  .cat-badge-agotado {
    background: rgba(150,150,150,.1);
    color: #999;
    border: 1px solid rgba(150,150,150,.25);
  }

  .cat-nombre {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--cafe);
    line-height: 1.3;
    margin-bottom: .25rem;
  }
  .cat-origen {
    font-size: .7rem;
    color: rgba(75,44,32,.5);
    font-weight: 400;
  }

  .cat-perfil {
    font-size: .78rem;
    color: rgba(75,44,32,.65);
    line-height: 1.6;
    margin-bottom: 1rem;
    padding-left: .1rem;
  }

  /* ── PRECIOS ── */
  .cat-precios {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
    margin-bottom: 1rem;
  }
  .cat-precio-bloque {
    background: rgba(245,230,211,.55);
    border: 1px solid rgba(197,157,95,.2);
    border-radius: 10px;
    padding: .6rem .75rem;
  }
  .cat-precio-label {
    font-size: .58rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(75,44,32,.4);
    margin-bottom: .2rem;
  }
  .cat-precio-cop {
    font-size: 1rem;
    font-weight: 700;
    color: var(--cafe);
    line-height: 1.1;
  }
  .cat-precio-usd {
    font-size: .68rem;
    color: var(--oro);
    font-weight: 600;
    margin-top: .1rem;
  }

  /* ── BOTÓN WA ── */
  .cat-wa-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .45rem;
    width: 100%;
    padding: .7rem 1rem;
    background: #25D366;
    color: #fff;
    font-size: .78rem;
    font-weight: 700;
    letter-spacing: .04em;
    border-radius: 10px;
    text-decoration: none;
    transition: background .18s, transform .15s;
  }
  .cat-wa-btn:hover {
    background: #1ebe5b;
    transform: translateY(-1px);
  }
  .cat-wa-btn.deshabilitado {
    background: #ccc;
    color: #888;
    pointer-events: none;
  }

  /* ── FOOTER ── */
  .cat-footer {
    text-align: center;
    padding: 1.5rem 1rem 2rem;
    font-size: .68rem;
    color: rgba(75,44,32,.4);
    border-top: 1px solid rgba(197,157,95,.2);
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
  }
  .cat-footer-link {
    color: var(--oro);
    text-decoration: none;
    font-weight: 600;
    font-size: .7rem;
  }
  .cat-footer-link:hover { text-decoration: underline; }
`;

export default function CatalogoPage() {
  const [filtro, setFiltro] = useState<Proceso>('Todos');

  const filtrados = filtro === 'Todos'
    ? cafes
    : cafes.filter((c) => c.proceso === filtro);

  const filtros: Proceso[] = ['Todos', 'Natural', 'Lavado'];

  return (
    <div className="cat-wrap">
      <style dangerouslySetInnerHTML={{ __html: ESTILOS }} />

      <header className="cat-header">
        <Link href="/" className="cat-back">← Volver a la calculadora</Link>
        <p className="cat-h-eye">☕ Don Elí · Santander, Colombia</p>
        <h1 className="cat-h-title"><em>Catálogo</em> Don Elí</h1>
        <p className="cat-h-sub">Café de Especialidad Colombiano</p>
        <div className="cat-h-line" />
      </header>

      <div className="cat-main">

        <div className="cat-trm">
          <strong>TRM 19 abril 2026: $3.593 COP/USD</strong><br />
          Precios en USD redondeados · Consulta disponibilidad · Rotación mensual
        </div>

        <div className="cat-filtros">
          {filtros.map((f) => (
            <button
              key={f}
              className={`cat-filtro-btn${filtro === f ? ' activo' : ''}`}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="cat-count">
          {filtrados.length} café{filtrados.length !== 1 ? 's' : ''}
          {filtro !== 'Todos' ? ` · proceso ${filtro}` : ''}
        </p>

        {filtrados.map((cafe, i) => (
          <div
            key={cafe.id}
            className={`cat-card${!cafe.disponible ? ' agotado' : ''}`}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="cat-card-top">
              <span className="cat-emoji">{cafe.emoji}</span>
              <div className="cat-card-info">
                <div className="cat-badges">
                  {cafe.badge === 'Premium' && (
                    <span className="cat-badge cat-badge-premium">Premium</span>
                  )}
                  {cafe.badge === 'Local' && (
                    <span className="cat-badge cat-badge-local">Local</span>
                  )}
                  <span className="cat-badge cat-badge-proceso">{cafe.proceso}</span>
                  {!cafe.disponible && (
                    <span className="cat-badge cat-badge-agotado">Agotado</span>
                  )}
                </div>
                <p className="cat-nombre">{cafe.nombre}</p>
                <p className="cat-origen">
                  {cafe.origen}{cafe.altitud ? ` · ${cafe.altitud}` : ''}
                </p>
              </div>
            </div>

            <p className="cat-perfil">{cafe.perfil}</p>

            <div className="cat-precios">
              <div className="cat-precio-bloque">
                <p className="cat-precio-label">500 g</p>
                <p className="cat-precio-cop">{fmtCOP(cafe.precio500g_cop)}</p>
                <p className="cat-precio-usd">≈ USD {cafe.precio500g_usd}</p>
              </div>
              <div className="cat-precio-bloque">
                <p className="cat-precio-label">1 kg</p>
                <p className="cat-precio-cop">{fmtCOP(cafe.precioKilo_cop)}</p>
                <p className="cat-precio-usd">≈ USD {cafe.precioKilo_usd}</p>
              </div>
            </div>

            <a
              href={cafe.disponible ? waLink(cafe.nombre) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`cat-wa-btn${!cafe.disponible ? ' deshabilitado' : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {cafe.disponible ? 'Pedir por WhatsApp' : 'No disponible'}
            </a>
          </div>
        ))}
      </div>

      <footer className="cat-footer">
        <span>Actualizado: 19 de abril de 2026</span>
        <Link href="/" className="cat-footer-link">← Volver a la calculadora de café</Link>
      </footer>
    </div>
  );
}
