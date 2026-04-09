'use client';/**
 * DonEliBrewAssistant.tsx
 * ─────────────────────────────────────────────────────────────
 * Calculadora de Extracción Don Elí — Brew Assistant
 * Componente React con TypeScript completo y auto-contenido.
 *
 * Uso:
 *   import DonEliBrewAssistant from './DonEliBrewAssistant'
 *   <DonEliBrewAssistant />
 *
 * Requiere en index.html (o equivalente):
 *   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';

// ══════════════════════════════════════════════════════════════
// TIPOS
// ══════════════════════════════════════════════════════════════

type MetodoId = 'v60' | 'chemex' | 'prensa' | 'aeropress';

interface Metodo {
  id: MetodoId;
  nombre: string;
  tipo: string;
  icono: string;
  molienda: string;
  temperatura: string;
  tiempo: string;
  nota: string;
}

// ══════════════════════════════════════════════════════════════
// DATOS
// ══════════════════════════════════════════════════════════════

const METODOS: Metodo[] = [
  {
    id: 'v60',
    nombre: 'V60',
    tipo: 'Pour Over',
    icono: '☕',
    molienda: 'Media-Fina',
    temperatura: '92–94°C',
    tiempo: '2:30–3:30 min',
    nota: 'Vierte en espiral desde el centro. Primera vuelta (bloom) 30s con el doble de agua que café.',
  },
  {
    id: 'chemex',
    nombre: 'Chemex',
    tipo: 'Filtro Grueso',
    icono: '🫙',
    molienda: 'Media-Gruesa',
    temperatura: '93–96°C',
    tiempo: '4:00–5:00 min',
    nota: 'El filtro Chemex retiene más aceites. Produce una taza más limpia y brillante. Ideal para cafés frutales.',
  },
  {
    id: 'prensa',
    nombre: 'Prensa Francesa',
    tipo: 'Inmersión',
    icono: '🧪',
    molienda: 'Gruesa',
    temperatura: '90–94°C',
    tiempo: '4:00 min',
    nota: 'Sumerge todo el café a la vez. Presiona el émbolo lentamente. Más cuerpo y aceites en taza.',
  },
  {
    id: 'aeropress',
    nombre: 'AeroPress',
    tipo: 'Presión',
    icono: '💨',
    molienda: 'Media',
    temperatura: '80–85°C',
    tiempo: '1:30–2:30 min',
    nota: 'Versátil y rápida. Temperatura más baja minimiza acidez. Prueba la técnica invertida para más control.',
  },
];

const RATIO_OPCIONES: number[] = [13, 15, 16, 17, 18];

// ══════════════════════════════════════════════════════════════
// CSS GLOBAL (inyectado una sola vez via <style>)
// ══════════════════════════════════════════════════════════════

const ESTILOS_GLOBALES = `
  :root {
    --bg:     #F5E6D3;
    --cafe:   #4B2C20;
    --oro:    #C59D5F;
    --blanco: #FFFFFF;
    --gris:   #333333;
    --sombra: 0 4px 24px rgba(75,44,32,0.12);
    --r:      16px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background-color: var(--bg);
    background-image:
      radial-gradient(ellipse at 15% 10%, rgba(197,157,95,.13) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 85%, rgba(75,44,32,.07) 0%, transparent 55%);
    color: var(--cafe);
    min-height: 100vh;
  }

  /* ── HEADER ── */
  .dei-header {
    background: var(--cafe);
    padding: 1.6rem 1.2rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .dei-header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(197,157,95,.22) 0%, transparent 65%);
    pointer-events: none;
  }
  .dei-h-eye {
    font-size: .65rem;
    font-weight: 600;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .4rem;
  }
  .dei-h-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 7vw, 2.9rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1.15;
  }
  .dei-h-title em { color: var(--oro); font-style: italic; }
  .dei-h-sub {
    font-size: .78rem;
    font-weight: 300;
    color: rgba(245,230,211,.55);
    margin-top: .5rem;
    letter-spacing: .04em;
  }
  .dei-h-line {
    width: 42px; height: 2px;
    background: var(--oro);
    margin: .9rem auto 0;
    border-radius: 2px;
  }

  /* ── MAIN ── */
  .dei-main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1.4rem 1rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /* ── CARD ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .dei-card {
    background: var(--blanco);
    border-radius: var(--r);
    padding: 1.4rem 1.2rem;
    box-shadow: var(--sombra);
    border: 1px solid rgba(197,157,95,.14);
    animation: fadeUp .45s ease both;
  }
  .dei-ctitle {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--cafe);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: .5rem;
  }
  .dei-cico {
    width: 28px; height: 28px;
    background: var(--bg);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: .9rem;
    flex-shrink: 0;
  }

  /* ── MÉTODOS ── */
  .dei-metodos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .65rem;
  }
  .dei-mbtn {
    border: 2px solid rgba(197,157,95,.3);
    background: var(--bg);
    border-radius: 12px;
    padding: .9rem .5rem;
    cursor: pointer;
    transition: all .22s;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .3rem;
    font-family: inherit;
  }
  .dei-mbtn:hover {
    border-color: var(--oro);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(197,157,95,.22);
  }
  .dei-mbtn.on {
    border-color: var(--oro);
    background: var(--cafe);
    box-shadow: 0 6px 22px rgba(75,44,32,.28);
  }
  .dei-m-ico { font-size: 1.6rem; line-height: 1; }
  .dei-m-nom { font-size: .78rem; font-weight: 600; color: var(--cafe); transition: color .22s; }
  .dei-mbtn.on .dei-m-nom { color: var(--oro); }
  .dei-m-tip { font-size: .62rem; color: var(--gris); opacity: .65; font-weight: 300; }
  .dei-mbtn.on .dei-m-tip { color: rgba(245,230,211,.55); opacity:1; }

  /* ── SLIDERS ── */
  .dei-ig { margin-bottom: 1rem; }
  .dei-ig:last-child { margin-bottom: 0; }
  .dei-ilabel { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .55rem; }
  .dei-ilabel-txt { font-size: .78rem; font-weight: 500; color: var(--gris); }
  .dei-ilabel-val { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--cafe); }
  .dei-ilabel-u { font-size: .7rem; color: var(--oro); margin-left: 2px; font-family: 'DM Sans',sans-serif; font-weight: 400; }

  .dei-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%; height: 6px;
    border-radius: 3px;
    background: var(--bg);
    border: 1px solid rgba(197,157,95,.25);
    outline: none;
    cursor: pointer;
  }
  .dei-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--oro);
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(197,157,95,.5);
    cursor: pointer;
    transition: transform .15s;
  }
  .dei-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
  .dei-range::-moz-range-thumb {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--oro);
    border: 3px solid #fff;
  }
  .dei-s-hints {
    display: flex;
    justify-content: space-between;
    font-size: .62rem;
    color: rgba(75,44,32,.38);
    margin-top: .3rem;
    font-weight: 300;
  }

  /* ── RATIO PILLS ── */
  .dei-rpills { display: flex; gap: .45rem; flex-wrap: wrap; margin-top: .65rem; }
  .dei-rpill {
    padding: .38rem .85rem;
    border-radius: 50px;
    border: 1.5px solid rgba(197,157,95,.4);
    background: var(--bg);
    font-size: .74rem;
    font-weight: 600;
    color: var(--cafe);
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
  }
  .dei-rpill:hover, .dei-rpill.on { background: var(--oro); border-color: var(--oro); color: #fff; }

  /* ── RESULTADO ── */
  .dei-res-card {
    background: var(--cafe);
    border-radius: var(--r);
    padding: 1.8rem 1.2rem;
    text-align: center;
    box-shadow: 0 8px 32px rgba(75,44,32,.3);
    position: relative;
    overflow: hidden;
    animation: fadeUp .45s .2s ease both;
  }
  .dei-res-card::before {
    content: '';
    position: absolute;
    top: -40%; left: 50%;
    transform: translateX(-50%);
    width: 200%; height: 200%;
    background: radial-gradient(ellipse at center, rgba(197,157,95,.14) 0%, transparent 60%);
    pointer-events: none;
  }
  .dei-res-lbl {
    font-size: .68rem;
    font-weight: 600;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(197,157,95,.75);
    margin-bottom: .35rem;
  }
  .dei-res-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.2rem, 15vw, 5.2rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1;
    letter-spacing: -.02em;
  }
  .dei-res-u { font-size: 1.2rem; font-weight: 300; color: var(--oro); }
  .dei-res-row { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1rem; }
  .dei-ri { display: flex; flex-direction: column; align-items: center; gap: .12rem; }
  .dei-ri-v { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600; color: var(--bg); }
  .dei-ri-l { font-size: .58rem; font-weight: 400; color: rgba(245,230,211,.45); letter-spacing: .1em; text-transform: uppercase; }
  .dei-rsep { width: 1px; background: rgba(197,157,95,.28); align-self: stretch; }

  /* ── GUÍA ── */
  .dei-gg { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .65rem; }
  .dei-gi {
    background: var(--bg);
    border-radius: 12px;
    padding: .85rem .5rem;
    text-align: center;
    border: 1px solid rgba(197,157,95,.2);
  }
  .dei-gi-ico { font-size: 1.3rem; margin-bottom: .3rem; }
  .dei-gi-l { font-size: .57rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--oro); margin-bottom: .2rem; }
  .dei-gi-v { font-family: 'Playfair Display', serif; font-size: .85rem; font-weight: 600; color: var(--cafe); line-height: 1.3; }
  .dei-g-nota {
    margin-top: .8rem;
    padding: .75rem;
    background: var(--bg);
    border-radius: 10px;
    border-left: 3px solid var(--oro);
    font-size: .78rem;
    color: var(--gris);
    line-height: 1.55;
    font-style: italic;
  }

  /* ── PUBLICIDAD ── */
  .dei-pub-banner {
    border-radius: var(--r);
    padding: 1rem 1.2rem;
    background: linear-gradient(135deg, rgba(197,157,95,.08), rgba(75,44,32,.05));
    border: 1.5px dashed rgba(197,157,95,.38);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .38rem;
    min-height: 80px;
  }
  .dei-pub-cuadrada {
    border-radius: var(--r);
    padding: 1.2rem;
    background: linear-gradient(135deg, rgba(197,157,95,.08), rgba(75,44,32,.05));
    border: 1.5px dashed rgba(197,157,95,.38);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .4rem;
    min-height: 200px;
  }
  .dei-pub-lbl { font-size: .6rem; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: rgba(197,157,95,.65); }
  .dei-pub-sz  { font-size: .68rem; color: rgba(75,44,32,.32); font-weight: 300; }

  /* ── FOOTER ── */
  .dei-footer {
    background: var(--cafe);
    color: var(--bg);
    padding: 2rem 1.2rem;
    margin-top: .5rem;
  }
  .dei-fi { max-width: 600px; margin: 0 auto; }
  .dei-ft { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--oro); margin-bottom: .7rem; }
  .dei-fp { font-size: .82rem; line-height: 1.72; color: rgba(245,230,211,.75); margin-bottom: .8rem; }
  .dei-fp strong { color: var(--oro); font-weight: 600; }
  .dei-fdiv { width: 100%; height: 1px; background: rgba(197,157,95,.18); margin: 1rem 0; }
  .dei-fcp { font-size: .67rem; color: rgba(245,230,211,.32); text-align: center; letter-spacing: .07em; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--oro); border-radius: 3px; }
`;

// ══════════════════════════════════════════════════════════════
// SUB-COMPONENTES
// ══════════════════════════════════════════════════════════════

/** Placeholder elegante para anuncio horizontal (320×80) */
interface PublicidadBannerProps {
  slot?: string;
}
const PublicidadBanner: React.FC<PublicidadBannerProps> = ({ slot = 'banner-top' }) => (
  <div className="dei-pub-banner" aria-label="Espacio publicitario">
    <span style={{ fontSize: '1.4rem', opacity: 0.4 }}>📢</span>
    <span className="dei-pub-lbl">Publicidad</span>
    <span className="dei-pub-sz">Anuncio 320×80 · Slot: {slot}</span>
  </div>
);

/** Placeholder elegante para anuncio cuadrado (300×250) */
interface PublicidadCuadradaProps {
  slot?: string;
}
const PublicidadCuadrada: React.FC<PublicidadCuadradaProps> = ({ slot = 'square-mid' }) => (
  <div className="dei-pub-cuadrada" aria-label="Espacio publicitario cuadrado">
    <span style={{ fontSize: '2rem', opacity: 0.35 }}>☕</span>
    <span className="dei-pub-lbl">Publicidad</span>
    <span className="dei-pub-sz">Anuncio 300×250 · Slot: {slot}</span>
    <span style={{ fontSize: '.63rem', color: 'rgba(75,44,32,.28)', marginTop: '.2rem' }}>
      Google AdSense · Amazon Ads · Publicidad Directa
    </span>
  </div>
);

/** Selector de método de extracción */
interface SelectorMetodosProps {
  metodoActivo: MetodoId;
  onChange: (id: MetodoId) => void;
}
const SelectorMetodos: React.FC<SelectorMetodosProps> = ({ metodoActivo, onChange }) => (
  <div className="dei-card">
    <div className="dei-ctitle">
      <span className="dei-cico">🎯</span>
      Método de Extracción
    </div>
    <div className="dei-metodos">
      {METODOS.map((m) => (
        <button
          key={m.id}
          className={`dei-mbtn${metodoActivo === m.id ? ' on' : ''}`}
          onClick={() => onChange(m.id)}
          aria-pressed={metodoActivo === m.id}
        >
          <span className="dei-m-ico">{m.icono}</span>
          <span className="dei-m-nom">{m.nombre}</span>
          <span className="dei-m-tip">{m.tipo}</span>
        </button>
      ))}
    </div>
  </div>
);

/** Controles de gramos y ratio */
interface CalculadoraProps {
  gramos: number;
  setGramos: (v: number) => void;
  ratio: number;
  setRatio: (v: number) => void;
}
const Calculadora: React.FC<CalculadoraProps> = ({ gramos, setGramos, ratio, setRatio }) => (
  <div className="dei-card">
    <div className="dei-ctitle">
      <span className="dei-cico">⚖️</span>
      Parámetros de Extracción
    </div>

    {/* ── Gramos ── */}
    <div className="dei-ig">
      <div className="dei-ilabel">
        <span className="dei-ilabel-txt">Gramos de Café</span>
        <span className="dei-ilabel-val">
          {gramos}<span className="dei-ilabel-u">g</span>
        </span>
      </div>
      <input
        className="dei-range"
        type="range"
        min={8}
        max={60}
        step={1}
        value={gramos}
        onChange={(e) => setGramos(Number(e.target.value))}
        aria-label="Gramos de café"
      />
      <div className="dei-s-hints"><span>8 g</span><span>60 g</span></div>
    </div>

    {/* ── Ratio ── */}
    <div className="dei-ig">
      <div className="dei-ilabel">
        <span className="dei-ilabel-txt">Ratio Café : Agua</span>
        <span className="dei-ilabel-val">1:{ratio}</span>
      </div>

      {/* Pills de acceso rápido */}
      <div className="dei-rpills">
        {RATIO_OPCIONES.map((r) => (
          <button
            key={r}
            className={`dei-rpill${ratio === r ? ' on' : ''}`}
            onClick={() => setRatio(r)}
          >
            1:{r}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '.75rem' }}>
        <input
          className="dei-range"
          type="range"
          min={10}
          max={20}
          step={1}
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
          aria-label="Ratio de extracción"
        />
        <div className="dei-s-hints">
          <span>Intenso 1:10</span>
          <span>Suave 1:20</span>
        </div>
      </div>
    </div>
  </div>
);

/** Tarjeta de resultado principal */
interface ResultadoProps {
  gramos: number;
  ratio: number;
}
const Resultado: React.FC<ResultadoProps> = ({ gramos, ratio }) => {
  const aguaTotal = gramos * ratio;
  const tazas = (gramos / 7).toFixed(1);
  return (
    <div className="dei-res-card">
      <p className="dei-res-lbl">Agua Total Necesaria</p>
      <div>
        <span className="dei-res-num">{aguaTotal}</span>
        <span className="dei-res-u"> ml</span>
      </div>
      <div className="dei-res-row">
        <div className="dei-ri">
          <span className="dei-ri-v">{gramos}g</span>
          <span className="dei-ri-l">Café</span>
        </div>
        <div className="dei-rsep" />
        <div className="dei-ri">
          <span className="dei-ri-v">1:{ratio}</span>
          <span className="dei-ri-l">Ratio</span>
        </div>
        <div className="dei-rsep" />
        <div className="dei-ri">
          <span className="dei-ri-v">{tazas}</span>
          <span className="dei-ri-l">Tazas est.</span>
        </div>
      </div>
    </div>
  );
};

/** Guía técnica dinámica según método */
interface GuiaTecnicaProps {
  metodoId: MetodoId;
}
const GuiaTecnica: React.FC<GuiaTecnicaProps> = ({ metodoId }) => {
  const m = METODOS.find((x) => x.id === metodoId)!;
  return (
    <div className="dei-card">
      <div className="dei-ctitle">
        <span className="dei-cico">📋</span>
        Guía Técnica · {m.nombre}
      </div>
      <div className="dei-gg">
        <div className="dei-gi">
          <div className="dei-gi-ico">🌀</div>
          <div className="dei-gi-l">Molienda</div>
          <div className="dei-gi-v">{m.molienda}</div>
        </div>
        <div className="dei-gi">
          <div className="dei-gi-ico">🌡️</div>
          <div className="dei-gi-l">Temp.</div>
          <div className="dei-gi-v">{m.temperatura}</div>
        </div>
        <div className="dei-gi">
          <div className="dei-gi-ico">⏱️</div>
          <div className="dei-gi-l">Tiempo</div>
          <div className="dei-gi-v">{m.tiempo}</div>
        </div>
      </div>
      <div className="dei-g-nota">💡 {m.nota}</div>
    </div>
  );
};

/** Footer informativo SEO */
const FooterInfo: React.FC = () => (
  <footer className="dei-footer">
    <div className="dei-fi">
      <h2 className="dei-ft">¿Qué es el Ratio de Extracción?</h2>
      <p className="dei-fp">
        El <strong>ratio de extracción</strong> es la proporción entre la cantidad de café molido
        y el agua utilizada. Un ratio <strong>1:15</strong> significa que por cada gramo de café
        se usan 15 ml de agua. Este equilibrio determina la intensidad, dulzor y cuerpo de tu taza.
      </p>
      <p className="dei-fp">
        Los baristas recomiendan ratios entre <strong>1:14</strong> y <strong>1:17</strong> según
        el perfil del café. Más agua = más suave y frutal. Menos agua = más intenso y achocolatado.
      </p>
      <div className="dei-fdiv" />
      <h3 className="dei-ft" style={{ fontSize: '1rem', marginBottom: '.5rem' }}>
        Tradición Cafetera de Santander 🇨🇴
      </h3>
      <p className="dei-fp">
        Santander es una de las regiones cafeteras más antiguas de Colombia. Sus cafés, cultivados
        entre los <strong>1.200 y 1.800 m.s.n.m.</strong> en las laderas de la cordillera Oriental,
        se distinguen por notas de <strong>chocolate amargo, frutos secos y caña</strong> con acidez
        suave. La tradición santandereana fusiona métodos artesanales con las exigencias del café de
        especialidad internacional.
      </p>
      <p className="dei-fp">
        <strong>Don Elí Brew Assistant</strong> nació de esa pasión: llevar el conocimiento técnico
        del barista al alcance de cualquier amante del café en casa.
      </p>
      <div className="dei-fdiv" />
      <p className="dei-fcp">
        © 2024 Don Elí Brew Assistant · Hecho con ♥ y mucho café · Bucaramanga, Santander, Colombia
      </p>
    </div>
  </footer>
);

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════

const DonEliBrewAssistant: React.FC = () => {
  // Estado de la calculadora
  const [metodo, setMetodo] = useState<MetodoId>('v60');
  const [gramos, setGramos] = useState<number>(18);
  const [ratio, setRatio]   = useState<number>(15);

  return (
    <>
      {/* CSS global inyectado como <style> (evita dependencia de un .css externo) */}
      <style>{ESTILOS_GLOBALES}</style>

      {/* ── HEADER ── */}
      <header className="dei-header">
        <p className="dei-h-eye">☕ Santander · Colombia</p>
        <h1 className="dei-h-title">
          Don Elí: <em>Brew</em> Assistant
        </h1>
        <p className="dei-h-sub">
          Calculadora profesional de extracción para café de especialidad
        </p>
        <div className="dei-h-line" />
      </header>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <main className="dei-main">

        {/* Publicidad banner superior */}
        <PublicidadBanner slot="banner-top" />

        {/* 1. Selector de métodos */}
        <SelectorMetodos metodoActivo={metodo} onChange={setMetodo} />

        {/* 2. Controles de gramos y ratio */}
        <Calculadora
          gramos={gramos}
          setGramos={setGramos}
          ratio={ratio}
          setRatio={setRatio}
        />

        {/* 3. Resultado de agua total */}
        <Resultado gramos={gramos} ratio={ratio} />

        {/* 4. Guía técnica dinámica */}
        <GuiaTecnica metodoId={metodo} />

        {/* Publicidad cuadrada */}
        <PublicidadCuadrada slot="square-mid" />

      </main>

      {/* ── FOOTER SEO ── */}
      <FooterInfo />
    </>
  );
};

export default DonEliBrewAssistant;