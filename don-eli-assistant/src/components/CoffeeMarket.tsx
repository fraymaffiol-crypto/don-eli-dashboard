'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

// ══════════════════════════════════════════════════════════════
// TIPOS
// ══════════════════════════════════════════════════════════════

interface CoffeeQuote {
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  prevClose: number;
  time: number;
  marketState: string;
  name: string;
}

// ══════════════════════════════════════════════════════════════
// CSS
// ══════════════════════════════════════════════════════════════

const ESTILOS = `
  /* Reutiliza las variables definidas por DonEliBrewAssistant si están presentes */
  .cm-wrap {
    --bg:     #F5E6D3;
    --cafe:   #4B2C20;
    --oro:    #C59D5F;
    --blanco: #FFFFFF;
    --verde:  #2D6A4F;
    --rojo:   #9B2226;
    --sombra: 0 4px 24px rgba(75,44,32,0.12);
    --r:      16px;
    font-family: 'DM Sans', sans-serif;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── CABECERA ── */
  .cm-header {
    background: var(--cafe);
    border-radius: var(--r) var(--r) 0 0;
    padding: .9rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
  }
  .cm-header-left {
    display: flex;
    flex-direction: column;
    gap: .15rem;
  }
  .cm-ticker {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--bg);
    letter-spacing: .02em;
  }
  .cm-ticker em { color: var(--oro); font-style: italic; }
  .cm-subtitle {
    font-size: .6rem;
    font-weight: 500;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(245,230,211,.45);
  }
  .cm-badge {
    display: flex;
    align-items: center;
    gap: .35rem;
    padding: .3rem .75rem;
    border-radius: 50px;
    font-size: .65rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    border: 1.5px solid;
    flex-shrink: 0;
  }
  .cm-badge.open   { color: #4ade80; border-color: rgba(74,222,128,.4); background: rgba(74,222,128,.08); }
  .cm-badge.closed { color: rgba(245,230,211,.45); border-color: rgba(245,230,211,.2); background: rgba(245,230,211,.05); }
  .cm-badge.pre    { color: #fbbf24; border-color: rgba(251,191,36,.4); background: rgba(251,191,36,.08); }
  .cm-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .cm-badge.open   .cm-badge-dot { background: #4ade80; box-shadow: 0 0 5px #4ade80; animation: cmPulse 1.8s ease-in-out infinite; }
  .cm-badge.closed .cm-badge-dot { background: rgba(245,230,211,.35); }
  .cm-badge.pre    .cm-badge-dot { background: #fbbf24; }

  @keyframes cmPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: .35; }
  }

  /* ── CUERPO ── */
  .cm-body {
    background: var(--blanco);
    border-radius: 0 0 var(--r) var(--r);
    box-shadow: var(--sombra);
    border: 1px solid rgba(197,157,95,.14);
    border-top: none;
    padding: 1.4rem 1.2rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  /* ── PRECIO PRINCIPAL ── */
  .cm-price-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .cm-price-block {}
  .cm-price-label {
    font-size: .58rem;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(75,44,32,.4);
    margin-bottom: .2rem;
  }
  .cm-price {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 12vw, 4.2rem);
    font-weight: 700;
    color: var(--cafe);
    line-height: 1;
    letter-spacing: -.02em;
  }
  .cm-price-unit {
    font-size: .8rem;
    font-weight: 400;
    color: var(--oro);
    margin-left: .25rem;
    font-family: 'DM Sans', sans-serif;
  }
  .cm-change-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .2rem;
    padding-bottom: .35rem;
  }
  .cm-change {
    display: flex;
    align-items: center;
    gap: .3rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
  }
  .cm-change.up   { color: #2D6A4F; }
  .cm-change.down { color: #9B2226; }
  .cm-change.flat { color: rgba(75,44,32,.45); }
  .cm-change-arrow { font-size: 1rem; line-height: 1; }
  .cm-change-pct {
    font-size: .72rem;
    font-weight: 600;
    padding: .2rem .55rem;
    border-radius: 50px;
  }
  .cm-change-pct.up   { background: rgba(45,106,79,.1);  color: #2D6A4F; }
  .cm-change-pct.down { background: rgba(155,34,38,.1);  color: #9B2226; }
  .cm-change-pct.flat { background: rgba(75,44,32,.06);  color: rgba(75,44,32,.5); }

  /* ── DIVISOR ── */
  .cm-divider { height: 1px; background: rgba(197,157,95,.18); }

  /* ── ESTADÍSTICAS ── */
  .cm-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .65rem;
  }
  .cm-stat {
    background: var(--bg);
    border-radius: 12px;
    padding: .75rem .85rem;
    border: 1px solid rgba(197,157,95,.18);
  }
  .cm-stat-label {
    font-size: .57rem;
    font-weight: 600;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .25rem;
  }
  .cm-stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--cafe);
  }
  .cm-stat-value.high { color: #2D6A4F; }
  .cm-stat-value.low  { color: #9B2226; }

  /* ── PIE ── */
  .cm-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    flex-wrap: wrap;
  }
  .cm-updated {
    font-size: .62rem;
    color: rgba(75,44,32,.38);
    font-weight: 300;
  }
  .cm-updated strong { font-weight: 600; color: rgba(75,44,32,.55); }
  .cm-refresh-btn {
    display: flex;
    align-items: center;
    gap: .3rem;
    font-size: .63rem;
    font-weight: 600;
    letter-spacing: .06em;
    color: var(--oro);
    background: none;
    border: 1.5px solid rgba(197,157,95,.35);
    border-radius: 50px;
    padding: .25rem .7rem;
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
  }
  .cm-refresh-btn:hover:not(:disabled) {
    background: rgba(197,157,95,.1);
    border-color: var(--oro);
  }
  .cm-refresh-btn:disabled { opacity: .5; cursor: default; }
  .cm-spin { display: inline-block; }
  .cm-refresh-btn.loading .cm-spin { animation: cmSpin .7s linear infinite; }
  @keyframes cmSpin { to { transform: rotate(360deg); } }

  /* ── SKELETON / ERROR ── */
  .cm-skeleton {
    background: var(--blanco);
    border-radius: 0 0 var(--r) var(--r);
    box-shadow: var(--sombra);
    border: 1px solid rgba(197,157,95,.14);
    border-top: none;
    padding: 1.4rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }
  .cm-sk-line {
    border-radius: 8px;
    background: linear-gradient(90deg, rgba(197,157,95,.1) 25%, rgba(197,157,95,.2) 50%, rgba(197,157,95,.1) 75%);
    background-size: 200% 100%;
    animation: cmShimmer 1.4s ease-in-out infinite;
  }
  @keyframes cmShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .cm-error {
    background: var(--blanco);
    border-radius: 0 0 var(--r) var(--r);
    border: 1px solid rgba(197,157,95,.14);
    border-top: none;
    box-shadow: var(--sombra);
    padding: 2rem 1.2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .6rem;
  }
  .cm-error-ico { font-size: 2rem; opacity: .5; }
  .cm-error-msg { font-size: .82rem; color: rgba(75,44,32,.55); line-height: 1.5; }
  .cm-error-retry {
    margin-top: .3rem;
    font-size: .72rem;
    font-weight: 600;
    color: var(--oro);
    background: none;
    border: 1.5px solid rgba(197,157,95,.5);
    border-radius: 50px;
    padding: .35rem 1rem;
    cursor: pointer;
    font-family: inherit;
    transition: background .2s;
  }
  .cm-error-retry:hover { background: rgba(197,157,95,.1); }
`;

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════

const REFRESH_INTERVAL = 30; // segundos

function fmt(n: number | null | undefined, decimals = 2): string {
  if (n == null) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtVol(n: number | null | undefined): string {
  if (n == null) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function fmtTime(unix: number | null | undefined): string {
  if (unix == null) return '—';
  return new Date(unix * 1000).toLocaleTimeString('es-CO', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function dirClass(change: number | null | undefined): 'up' | 'down' | 'flat' {
  if (change == null || change === 0) return 'flat';
  return change > 0 ? 'up' : 'down';
}

function marketLabel(state: string | null | undefined): { label: string; cls: string } {
  switch (state) {
    case 'REGULAR': return { label: 'Mercado Abierto', cls: 'open' };
    case 'PRE':     return { label: 'Pre-Mercado',     cls: 'pre' };
    case 'POST':    return { label: 'Post-Mercado',    cls: 'pre' };
    case 'CLOSED':  return { label: 'Mercado Cerrado', cls: 'closed' };
    default:        return { label: 'Sin Datos',       cls: 'closed' };
  }
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE
// ══════════════════════════════════════════════════════════════

const CoffeeMarket: React.FC = () => {
  const [quote, setQuote]       = useState<CoffeeQuote | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const countdownRef = useRef(REFRESH_INTERVAL);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/coffee-price');
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Error al obtener datos');
      setQuote(data as CoffeeQuote);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
      countdownRef.current = REFRESH_INTERVAL;
      setCountdown(REFRESH_INTERVAL);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  // Countdown + auto-refresh
  useEffect(() => {
    timerRef.current = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 0) {
        fetchQuote();
      }
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fetchQuote]);

  const market = marketLabel(quote?.marketState);
  const dir    = dirClass(quote?.change);
  const arrow  = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';

  return (
    <div className="cm-wrap">
      <style>{ESTILOS}</style>

      {/* ── CABECERA ── */}
      <div className="cm-header">
        <div className="cm-header-left">
          <span className="cm-ticker">KC=F · <em>Café C</em></span>
          <span className="cm-subtitle">Futuros · ICE · USD cents/lb</span>
        </div>
        <div className={`cm-badge ${loading && !quote ? 'closed' : market.cls}`}>
          <span className="cm-badge-dot" />
          {loading && !quote ? 'Cargando…' : market.label}
        </div>
      </div>

      {/* ── SKELETON ── */}
      {loading && !quote && (
        <div className="cm-skeleton">
          <div className="cm-sk-line" style={{ height: '3.5rem', width: '55%' }} />
          <div className="cm-sk-line" style={{ height: '1rem', width: '35%' }} />
          <div style={{ height: '1px', background: 'rgba(197,157,95,.12)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
            {[1,2,3,4].map(i => (
              <div key={i} className="cm-sk-line" style={{ height: '3.5rem', borderRadius: '12px' }} />
            ))}
          </div>
        </div>
      )}

      {/* ── ERROR ── */}
      {!loading && error && (
        <div className="cm-error">
          <span className="cm-error-ico">📡</span>
          <p className="cm-error-msg">
            No fue posible obtener datos del mercado.<br />
            <span style={{ fontSize: '.75rem', opacity: .7 }}>{error}</span>
          </p>
          <button className="cm-error-retry" onClick={fetchQuote}>Reintentar</button>
        </div>
      )}

      {/* ── DATOS ── */}
      {quote && (
        <div className="cm-body">

          {/* Precio + cambio */}
          <div className="cm-price-row">
            <div className="cm-price-block">
              <p className="cm-price-label">Precio Actual</p>
              <div>
                <span className="cm-price">{fmt(quote.price)}</span>
                <span className="cm-price-unit">¢/lb</span>
              </div>
            </div>
            <div className="cm-change-block">
              <span className={`cm-change ${dir}`}>
                <span className="cm-change-arrow">{arrow}</span>
                {fmt(Math.abs(quote.change))}
              </span>
              <span className={`cm-change-pct ${dir}`}>
                {dir === 'up' ? '+' : dir === 'down' ? '-' : ''}
                {fmt(Math.abs(quote.changePercent), 2)}%
              </span>
            </div>
          </div>

          <div className="cm-divider" />

          {/* Estadísticas */}
          <div className="cm-stats">
            <div className="cm-stat">
              <p className="cm-stat-label">Máximo del Día</p>
              <p className="cm-stat-value high">▲ {fmt(quote.high)}</p>
            </div>
            <div className="cm-stat">
              <p className="cm-stat-label">Mínimo del Día</p>
              <p className="cm-stat-value low">▼ {fmt(quote.low)}</p>
            </div>
            <div className="cm-stat">
              <p className="cm-stat-label">Cierre Anterior</p>
              <p className="cm-stat-value">{fmt(quote.prevClose)}</p>
            </div>
            <div className="cm-stat">
              <p className="cm-stat-label">Volumen</p>
              <p className="cm-stat-value">{fmtVol(quote.volume)}</p>
            </div>
          </div>

          <div className="cm-divider" />

          {/* Pie */}
          <div className="cm-footer">
            <span className="cm-updated">
              Cotización: <strong>{fmtTime(quote.time)}</strong>
              {' · '}actualiza en <strong>{countdown}s</strong>
            </span>
            <button
              className={`cm-refresh-btn${loading ? ' loading' : ''}`}
              onClick={fetchQuote}
              disabled={loading}
            >
              <span className="cm-spin">↻</span>
              {loading ? 'Actualizando' : 'Actualizar'}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CoffeeMarket;
