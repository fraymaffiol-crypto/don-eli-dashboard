'use client'

/**
 * DonEliBrewAssistant.tsx
 * ─────────────────────────────────────────────────────────────
 * Calculadora de Extracción Don Elí — Brew Assistant
 * Incluye: AdSense listo para activar, sección ecommerce,
 * tarjetas de productos, botón flotante y blog hero.
 *
 * Uso: import DonEliBrewAssistant from './DonEliBrewAssistant'
 *      <DonEliBrewAssistant />
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from 'react';

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

interface Producto {
  id: string;
  emoji: string;
  nombre: string;
  descripcion: string;
  precio: string;
  categoria: string;
  url: string;
  badge?: string;
}

// ══════════════════════════════════════════════════════════════
// DATOS — MÉTODOS DE EXTRACCIÓN
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
// DATOS — PRODUCTOS ECOMMERCE
// Edita nombre, precio y url con los de tu tienda real
// ══════════════════════════════════════════════════════════════

const PRODUCTOS: Producto[] = [
  {
    id: 'cafe-origen',
    emoji: '☕',
    nombre: 'Café Origen Santander',
    descripcion: 'Grano entero · Notas de chocolate y frutos secos · 250g',
    precio: 'Ver precio',
    categoria: 'Café',
    url: 'https://donelicafe.com',
    badge: '⭐ Más vendido',
  },
  {
    id: 'v60-kit',
    emoji: '🫗',
    nombre: 'Kit V60 Completo',
    descripcion: 'Cafetera V60 + 40 filtros + guía de extracción',
    precio: 'Ver precio',
    categoria: 'Equipos',
    url: 'https://donelicafe.com',
  },
  {
    id: 'chemex-kit',
    emoji: '🧪',
    nombre: 'Chemex 6 tazas',
    descripcion: 'Vidrio borosilicato · Incluye filtros de madera',
    precio: 'Ver precio',
    categoria: 'Equipos',
    url: 'https://donelicafe.com',
  },
  {
    id: 'membresia',
    emoji: '🎯',
    nombre: 'Membresía Don Elí',
    descripcion: 'Café fresco cada mes · Descuentos · Contenido exclusivo',
    precio: 'Ver precio',
    categoria: 'Suscripción',
    url: 'https://donelicafe.com',
    badge: '🔥 Nuevo',
  },
];

// ══════════════════════════════════════════════════════════════
// CONFIGURACIÓN ADSENSE
// ─────────────────────────────────────────────────────────────
// Cuando te aprueben AdSense, reemplaza:
//   ADSENSE_CLIENT  → tu Publisher ID  (ej: "ca-pub-1234567890123456")
//   ADSENSE_SLOT_*  → tus Ad Unit IDs  (ej: "9876543210")
// Cambia ADSENSE_ACTIVO a true para activar los anuncios reales.
// ══════════════════════════════════════════════════════════════

const ADSENSE_ACTIVO    = false;               // ← cambiar a true cuando tengas aprobación
const ADSENSE_CLIENT    = 'ca-pub-XXXXXXXXXX'; // ← tu Publisher ID aquí
const ADSENSE_SLOT_TOP  = '0000000001';        // ← slot banner superior
const ADSENSE_SLOT_MID  = '0000000002';        // ← slot cuadrado medio

// ══════════════════════════════════════════════════════════════
// CSS GLOBAL
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
  .dei-res-lbl { font-size: .68rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: rgba(197,157,95,.75); margin-bottom: .35rem; }
  .dei-res-num { font-family: 'Playfair Display', serif; font-size: clamp(3.2rem, 15vw, 5.2rem); font-weight: 700; color: var(--bg); line-height: 1; letter-spacing: -.02em; }
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

  /* ── ADSENSE / PUBLICIDAD ── */
  .dei-ad-wrap {
    border-radius: var(--r);
    overflow: hidden;
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(197,157,95,.07), rgba(75,44,32,.04));
    border: 1.5px dashed rgba(197,157,95,.3);
  }
  .dei-ad-wrap.cuadrado { min-height: 260px; }
  .dei-ad-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .35rem;
    padding: 1rem;
    text-align: center;
  }
  .dei-ad-ico { font-size: 1.4rem; opacity: .35; }
  .dei-ad-lbl { font-size: .58rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(197,157,95,.55); }
  .dei-ad-hint { font-size: .62rem; color: rgba(75,44,32,.28); font-weight: 300; }

  /* ── ECOMMERCE — BANNER HERO ── */
  .dei-shop-hero {
    background: linear-gradient(135deg, var(--cafe) 0%, #6b3d2a 100%);
    border-radius: var(--r);
    padding: 1.6rem 1.2rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(75,44,32,.25);
  }
  .dei-shop-hero::before {
    content: '';
    position: absolute;
    top: -50%; right: -20%;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(197,157,95,.2) 0%, transparent 70%);
    pointer-events: none;
  }
  .dei-shop-eyebrow {
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .45rem;
    display: flex;
    align-items: center;
    gap: .4rem;
  }
  .dei-shop-eyebrow::before {
    content: '';
    display: inline-block;
    width: 16px; height: 2px;
    background: var(--oro);
    border-radius: 2px;
  }
  .dei-shop-titulo {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 5vw, 2rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1.2;
    margin-bottom: .5rem;
  }
  .dei-shop-titulo em { color: var(--oro); font-style: italic; }
  .dei-shop-desc {
    font-size: .78rem;
    color: rgba(245,230,211,.65);
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 1.1rem;
  }
  .dei-shop-btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    background: var(--oro);
    color: var(--cafe);
    font-family: 'DM Sans', sans-serif;
    font-size: .82rem;
    font-weight: 700;
    letter-spacing: .03em;
    padding: .7rem 1.4rem;
    border-radius: 50px;
    text-decoration: none;
    transition: all .22s;
    box-shadow: 0 4px 16px rgba(197,157,95,.35);
  }
  .dei-shop-btn:hover {
    background: var(--bg);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(197,157,95,.45);
  }

  /* ── ECOMMERCE — TARJETAS DE PRODUCTOS ── */
  .dei-prod-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .75rem;
  }
  .dei-prod-card {
    background: var(--blanco);
    border-radius: 14px;
    padding: 1rem .9rem;
    border: 1.5px solid rgba(197,157,95,.15);
    box-shadow: 0 2px 12px rgba(75,44,32,.07);
    display: flex;
    flex-direction: column;
    gap: .4rem;
    position: relative;
    transition: all .22s;
    text-decoration: none;
    color: inherit;
  }
  .dei-prod-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(75,44,32,.14);
    border-color: var(--oro);
  }
  .dei-prod-badge {
    position: absolute;
    top: .6rem; right: .6rem;
    font-size: .55rem;
    font-weight: 700;
    background: var(--oro);
    color: var(--cafe);
    padding: .18rem .5rem;
    border-radius: 50px;
    letter-spacing: .04em;
  }
  .dei-prod-ico { font-size: 1.8rem; line-height: 1; margin-bottom: .15rem; }
  .dei-prod-cat {
    font-size: .58rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--oro);
  }
  .dei-prod-nom {
    font-family: 'Playfair Display', serif;
    font-size: .88rem;
    font-weight: 600;
    color: var(--cafe);
    line-height: 1.3;
  }
  .dei-prod-desc {
    font-size: .68rem;
    color: var(--gris);
    opacity: .75;
    line-height: 1.4;
    flex: 1;
  }
  .dei-prod-cta {
    margin-top: .4rem;
    font-size: .72rem;
    font-weight: 700;
    color: var(--oro);
    display: flex;
    align-items: center;
    gap: .25rem;
  }

  /* ── TARJETA RECETA COMPARTIBLE ── */
  .dei-receta-wrap { display: flex; flex-direction: column; gap: .9rem; }
  .dei-receta-card {
    background: var(--cafe);
    border-radius: var(--r);
    padding: 1.5rem 1.2rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(197,157,95,.2);
  }
  .dei-receta-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 10% 90%, rgba(197,157,95,.12) 0%, transparent 55%),
      radial-gradient(ellipse at 90% 10%, rgba(197,157,95,.08) 0%, transparent 50%);
    pointer-events: none;
  }
  .dei-receta-card::after {
    content: '';
    position: absolute;
    top: 10px; left: 10px; right: 10px; bottom: 10px;
    border: 1px solid rgba(197,157,95,.12);
    border-radius: 10px;
    pointer-events: none;
  }
  .dei-receta-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; position: relative; }
  .dei-receta-marca { display: flex; flex-direction: column; gap: .15rem; }
  .dei-receta-logo { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--oro); }
  .dei-receta-sub { font-size: .56rem; font-weight: 400; color: rgba(245,230,211,.4); letter-spacing: .12em; text-transform: uppercase; }
  .dei-receta-metodo-badge {
    display: flex; flex-direction: column; align-items: center; gap: .15rem;
    background: rgba(197,157,95,.12);
    border: 1px solid rgba(197,157,95,.25);
    border-radius: 10px;
    padding: .5rem .75rem;
  }
  .dei-receta-metodo-ico { font-size: 1.4rem; line-height: 1; }
  .dei-receta-metodo-nom { font-size: .58rem; font-weight: 700; color: var(--oro); letter-spacing: .08em; text-transform: uppercase; }
  .dei-receta-nums { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: .6rem; margin-bottom: 1rem; position: relative; }
  .dei-receta-num-item {
    background: rgba(245,230,211,.06);
    border-radius: 10px; padding: .7rem .4rem; text-align: center;
    border: 1px solid rgba(197,157,95,.12);
  }
  .dei-receta-num-val { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--bg); line-height: 1; display: block; }
  .dei-receta-num-val.grande { font-size: 1.8rem; color: var(--oro); }
  .dei-receta-num-lbl { font-size: .53rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(245,230,211,.4); margin-top: .2rem; display: block; }
  .dei-receta-guia { display: flex; justify-content: space-between; padding-top: .8rem; border-top: 1px solid rgba(197,157,95,.12); position: relative; }
  .dei-receta-guia-item { display: flex; flex-direction: column; align-items: center; gap: .15rem; }
  .dei-receta-guia-ico { font-size: .95rem; }
  .dei-receta-guia-val { font-size: .68rem; font-weight: 600; color: var(--bg); font-family: 'Playfair Display', serif; }
  .dei-receta-guia-lbl { font-size: .5rem; color: rgba(245,230,211,.38); text-transform: uppercase; letter-spacing: .08em; font-weight: 500; }
  .dei-receta-url { font-size: .56rem; color: rgba(197,157,95,.45); text-align: center; margin-top: .85rem; letter-spacing: .06em; position: relative; }

  /* ── COMUNIDAD ── */
  .dei-comunidad {
    background: linear-gradient(135deg, #1a472a 0%, #25D366 100%);
    border-radius: var(--r);
    padding: 1.5rem 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .75rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 6px 24px rgba(37,211,102,.25);
  }
  .dei-comunidad::before {
    content: '';
    position: absolute;
    top: -40%; right: -20%;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(255,255,255,.06);
    pointer-events: none;
  }
  .dei-comunidad-ico {
    font-size: 2.2rem;
    line-height: 1;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,.2));
  }
  .dei-comunidad-eyebrow {
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(255,255,255,.6);
  }
  .dei-comunidad-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
  }
  .dei-comunidad-titulo em {
    font-style: italic;
    color: #dcf8c6;
  }
  .dei-comunidad-desc {
    font-size: .76rem;
    color: rgba(255,255,255,.75);
    font-weight: 300;
    line-height: 1.5;
    max-width: 320px;
  }
  .dei-comunidad-btn {
    display: inline-flex;
    align-items: center;
    gap: .55rem;
    background: #fff;
    color: #1a472a;
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem;
    font-weight: 700;
    padding: .75rem 1.6rem;
    border-radius: 50px;
    text-decoration: none;
    transition: all .22s;
    box-shadow: 0 4px 16px rgba(0,0,0,.15);
    margin-top: .2rem;
  }
  .dei-comunidad-btn:hover {
    background: #dcf8c6;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0,0,0,.2);
  }
  .dei-comunidad-miembros {
    font-size: .62rem;
    color: rgba(255,255,255,.5);
    letter-spacing: .04em;
  }

  /* ── BLOG HERO ── */
  .dei-blog-hero {
    background: var(--cafe);
    padding: 2.2rem 1.2rem 2rem;
    position: relative;
    overflow: hidden;
  }
  .dei-blog-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(197,157,95,.18) 0%, transparent 65%);
    pointer-events: none;
  }
  .dei-blog-inner { max-width: 600px; margin: 0 auto; position: relative; }
  .dei-blog-eyebrow {
    font-size: .62rem;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .5rem;
    display: flex;
    align-items: center;
    gap: .4rem;
  }
  .dei-blog-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px; height: 2px;
    background: var(--oro);
    border-radius: 2px;
  }
  .dei-blog-titulo {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 6vw, 2.4rem);
    font-weight: 700;
    color: var(--bg);
    line-height: 1.2;
    margin-bottom: .6rem;
  }
  .dei-blog-titulo em { color: var(--oro); font-style: italic; }
  .dei-blog-desc { font-size: .82rem; color: rgba(245,230,211,.6); font-weight: 300; line-height: 1.5; margin-bottom: 1.1rem; }
  .dei-blog-cta {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    background: var(--oro);
    color: var(--cafe);
    font-family: 'DM Sans', sans-serif;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .04em;
    padding: .65rem 1.3rem;
    border-radius: 50px;
    text-decoration: none;
    transition: all .22s;
  }
  .dei-blog-cta:hover { background: var(--bg); transform: translateX(3px); }
  .dei-blog-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .9rem; }
  .dei-blog-tag {
    font-size: .62rem;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: rgba(197,157,95,.7);
    border: 1px solid rgba(197,157,95,.25);
    padding: .22rem .65rem;
    border-radius: 50px;
  }

  /* ── FOOTER ── */
  .dei-footer { background: #3a2118; color: var(--bg); padding: 2rem 1.2rem 1.5rem; }
  .dei-fi { max-width: 600px; margin: 0 auto; }
  .dei-ft { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 600; color: var(--oro); margin-bottom: .6rem; }
  .dei-fp { font-size: .79rem; line-height: 1.72; color: rgba(245,230,211,.65); margin-bottom: .75rem; }
  .dei-fp strong { color: var(--oro); font-weight: 600; }
  .dei-fdiv { width: 100%; height: 1px; background: rgba(197,157,95,.15); margin: 1rem 0; }
  .dei-fcp { font-size: .65rem; color: rgba(245,230,211,.28); text-align: center; letter-spacing: .07em; }

  /* ── BOTÓN FLOTANTE ── */
  .dei-fab {
    position: fixed;
    bottom: 1.4rem;
    right: 1.2rem;
    z-index: 999;
    display: flex;
    align-items: center;
    gap: .5rem;
    background: var(--cafe);
    color: var(--oro);
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem;
    font-weight: 700;
    padding: .7rem 1.1rem;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 6px 24px rgba(75,44,32,.4);
    border: 1.5px solid rgba(197,157,95,.35);
    transition: all .22s;
    animation: fabPop .5s 1s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes fabPop {
    from { opacity:0; transform: scale(.6) translateY(20px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  .dei-fab:hover {
    background: var(--oro);
    color: var(--cafe);
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(197,157,95,.45);
  }
  .dei-fab-ico { font-size: 1rem; }
  .dei-fab-txt { white-space: nowrap; }

  /* ── SEPARADOR DE SECCIÓN ── */
  .dei-section-sep {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: 0 .25rem;
  }
  .dei-section-sep-line { flex: 1; height: 1px; background: rgba(197,157,95,.25); }
  .dei-section-sep-lbl {
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: rgba(197,157,95,.6);
    white-space: nowrap;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--oro); border-radius: 3px; }
`;

// ══════════════════════════════════════════════════════════════
// SUB-COMPONENTES
// ══════════════════════════════════════════════════════════════

/**
 * AdSense / Publicidad
 * Muestra el anuncio real cuando ADSENSE_ACTIVO=true,
 * o un placeholder elegante cuando aún no está aprobado.
 */
interface AdSlotProps {
  slot: string;
  cuadrado?: boolean;
}
const AdSlot: React.FC<AdSlotProps> = ({ slot, cuadrado = false }) => {
  useEffect(() => {
    if (ADSENSE_ACTIVO) {
      try {
        // Empuja el anuncio a AdSense cuando el componente monta
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {}
    }
  }, []);

  if (ADSENSE_ACTIVO) {
    return (
      <div className={`dei-ad-wrap${cuadrado ? ' cuadrado' : ''}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: cuadrado ? '250px' : '90px' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder mientras AdSense no está aprobado
  return (
    <div className={`dei-ad-wrap${cuadrado ? ' cuadrado' : ''}`} aria-label="Espacio publicitario">
      <div className="dei-ad-placeholder">
        <span className="dei-ad-ico">📢</span>
        <span className="dei-ad-lbl">Publicidad</span>
        <span className="dei-ad-hint">
          {cuadrado ? 'Anuncio 300×250' : 'Anuncio 320×90'} · Slot: {slot}
        </span>
        <span className="dei-ad-hint" style={{ marginTop: '.25rem', fontSize: '.58rem' }}>
          Activa AdSense cambiando ADSENSE_ACTIVO = true
        </span>
      </div>
    </div>
  );
};

/** Separador de sección con etiqueta */
const SepSeccion: React.FC<{ label: string }> = ({ label }) => (
  <div className="dei-section-sep">
    <div className="dei-section-sep-line" />
    <span className="dei-section-sep-lbl">{label}</span>
    <div className="dei-section-sep-line" />
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

    {/* Gramos */}
    <div className="dei-ig">
      <div className="dei-ilabel">
        <span className="dei-ilabel-txt">Gramos de Café</span>
        <span className="dei-ilabel-val">
          {gramos}<span className="dei-ilabel-u">g</span>
        </span>
      </div>
      <input
        className="dei-range"
        type="range" min={8} max={60} step={1} value={gramos}
        onChange={(e) => setGramos(Number(e.target.value))}
        aria-label="Gramos de café"
      />
      <div className="dei-s-hints"><span>8 g</span><span>60 g</span></div>
    </div>

    {/* Ratio */}
    <div className="dei-ig">
      <div className="dei-ilabel">
        <span className="dei-ilabel-txt">Ratio Café : Agua</span>
        <span className="dei-ilabel-val">1:{ratio}</span>
      </div>
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
          type="range" min={10} max={20} step={1} value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
          aria-label="Ratio de extracción"
        />
        <div className="dei-s-hints"><span>Intenso 1:10</span><span>Suave 1:20</span></div>
      </div>
    </div>
  </div>
);

/** Resultado principal */
interface ResultadoProps { gramos: number; ratio: number; }
const Resultado: React.FC<ResultadoProps> = ({ gramos, ratio }) => (
  <div className="dei-res-card">
    <p className="dei-res-lbl">Agua Total Necesaria</p>
    <div>
      <span className="dei-res-num">{gramos * ratio}</span>
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
        <span className="dei-ri-v">{(gramos / 7).toFixed(1)}</span>
        <span className="dei-ri-l">Tazas est.</span>
      </div>
    </div>
  </div>
);

/** Guía técnica dinámica */
interface GuiaTecnicaProps { metodoId: MetodoId; }
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

/**
 * Sección Ecommerce — Banner hero de la tienda
 */
const ShopHero: React.FC = () => (
  <div className="dei-shop-hero">
    <p className="dei-shop-eyebrow">Tienda Don Elí</p>
    <h2 className="dei-shop-titulo">
      El mejor café,<br /><em>directo a tu taza</em>
    </h2>
    <p className="dei-shop-desc">
      Café de origen santandereano, equipos de especialidad y membresías
      para los que se toman el café en serio.
    </p>
    <a
      href="https://donelicafe.com"
      target="_blank"
      rel="noopener noreferrer"
      className="dei-shop-btn"
    >
      🛒 Ir a la tienda →
    </a>
  </div>
);

/**
 * Tarjetas de productos destacados
 * Edita el array PRODUCTOS arriba con tus productos reales
 */
const TarjetasProductos: React.FC = () => (
  <div className="dei-prod-grid">
    {PRODUCTOS.map((p) => (
      <a
        key={p.id}
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="dei-prod-card"
      >
        {p.badge && <span className="dei-prod-badge">{p.badge}</span>}
        <span className="dei-prod-ico">{p.emoji}</span>
        <span className="dei-prod-cat">{p.categoria}</span>
        <span className="dei-prod-nom">{p.nombre}</span>
        <span className="dei-prod-desc">{p.descripcion}</span>
        <span className="dei-prod-cta">Ver producto →</span>
      </a>
    ))}
  </div>
);

/**
 * TarjetaReceta — genera una tarjeta visual con la receta del usuario
 * y permite compartirla por WhatsApp e Instagram Stories
 */
interface TarjetaRecetaProps {
  gramos: number;
  ratio: number;
  metodoId: MetodoId;
}
const TarjetaReceta: React.FC<TarjetaRecetaProps> = ({ gramos, ratio, metodoId }) => {
  const m = METODOS.find((x) => x.id === metodoId)!;
  const agua = gramos * ratio;
  const tazas = (gramos / 7).toFixed(1);

  return (
    <div className="dei-receta-wrap">

      {/* Título de sección */}
      <div className="dei-ctitle" style={{ marginBottom: 0 }}>
        <span className="dei-cico">📸</span>
        Tu Receta — Compártela
      </div>

      {/* Tarjeta visual de la receta */}
      <div className="dei-receta-card" id="receta-card">
        {/* Header: marca + método */}
        <div className="dei-receta-header">
          <div className="dei-receta-marca">
            <span className="dei-receta-logo">Don Elí ☕</span>
            <span className="dei-receta-sub">Brew Assistant · Calculadora</span>
          </div>
          <div className="dei-receta-metodo-badge">
            <span className="dei-receta-metodo-ico">{m.icono}</span>
            <span className="dei-receta-metodo-nom">{m.nombre}</span>
          </div>
        </div>

        {/* Números principales */}
        <div className="dei-receta-nums">
          <div className="dei-receta-num-item">
            <span className="dei-receta-num-val">{gramos}</span>
            <span className="dei-receta-num-lbl">Gramos</span>
          </div>
          <div className="dei-receta-num-item">
            <span className="dei-receta-num-val grande">{agua}</span>
            <span className="dei-receta-num-lbl">ml Agua</span>
          </div>
          <div className="dei-receta-num-item">
            <span className="dei-receta-num-val">1:{ratio}</span>
            <span className="dei-receta-num-lbl">Ratio</span>
          </div>
        </div>

        {/* Guía técnica compacta */}
        <div className="dei-receta-guia">
          <div className="dei-receta-guia-item">
            <span className="dei-receta-guia-ico">🌀</span>
            <span className="dei-receta-guia-val">{m.molienda}</span>
            <span className="dei-receta-guia-lbl">Molienda</span>
          </div>
          <div className="dei-receta-guia-item">
            <span className="dei-receta-guia-ico">🌡️</span>
            <span className="dei-receta-guia-val">{m.temperatura}</span>
            <span className="dei-receta-guia-lbl">Temp.</span>
          </div>
          <div className="dei-receta-guia-item">
            <span className="dei-receta-guia-ico">⏱️</span>
            <span className="dei-receta-guia-val">{m.tiempo}</span>
            <span className="dei-receta-guia-lbl">Tiempo</span>
          </div>
          <div className="dei-receta-guia-item">
            <span className="dei-receta-guia-ico">☕</span>
            <span className="dei-receta-guia-val">{tazas}</span>
            <span className="dei-receta-guia-lbl">Tazas</span>
          </div>
        </div>

        {/* URL de marca */}
        <p className="dei-receta-url">blog.donelicafe.com · #DonEliCafe #CafeEspecialidad</p>
      </div>

      {/* Botones de compartir → COMUNIDAD */}
      <div className="dei-comunidad">
        <span className="dei-comunidad-ico">☕</span>
        <span className="dei-comunidad-eyebrow">Comunidad Don Elí</span>
        <h3 className="dei-comunidad-titulo">
          <em>Locos x el Café</em><br />by Don Elí Café
        </h3>
        <p className="dei-comunidad-desc">
          Únete a nuestra comunidad de amantes del café de especialidad.
          Comparte recetas, aprende técnicas y conecta con otros baristas.
        </p>
        <a
          href="https://chat.whatsapp.com/Ji6H8cq1VWq25iamcmquEN?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="dei-comunidad-btn"
        >
          💬 Unirme al grupo
        </a>
        <span className="dei-comunidad-miembros">
          Grupo de WhatsApp · Café de Especialidad · Santander 🇨🇴
        </span>
      </div>

    </div>
  );
};

/** Bloque del Blog */
const BlogHero: React.FC = () => (
  <div className="dei-blog-hero">
    <div className="dei-blog-inner">
      <p className="dei-blog-eyebrow">El Blog del Café</p>
      <h2 className="dei-blog-titulo">
        Mercado · <em>Logística</em><br />Geopolítica
      </h2>
      <p className="dei-blog-desc">
        Análisis profundo del mundo del café de especialidad:<br />
        tendencias, origen, trazabilidad y mercado global.
      </p>
      <a
        href="https://blog.donelicafe.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="dei-blog-cta"
      >
        Leer artículos →
      </a>
      <div className="dei-blog-tags">
        {['Especialidad', 'Origen', 'Precios', 'Barismo', 'Colombia'].map((tag) => (
          <span key={tag} className="dei-blog-tag">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

/** Footer SEO */
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
      <h3 className="dei-ft">Tradición Cafetera de Santander 🇨🇴</h3>
      <p className="dei-fp">
        Santander es una de las regiones cafeteras más antiguas de Colombia. Sus cafés, cultivados
        entre los <strong>1.200 y 1.800 m.s.n.m.</strong> en las laderas de la cordillera Oriental,
        se distinguen por notas de <strong>chocolate amargo, frutos secos y caña</strong> con acidez
        suave. La tradición santandereana fusiona métodos artesanales con las exigencias del café
        de especialidad internacional.
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

/**
 * Botón flotante fijo — siempre visible
 * Lleva directo a donelicafe.com desde cualquier parte de la página
 */
const BotonFlotante: React.FC = () => (
  <a
    href="https://donelicafe.com"
    target="_blank"
    rel="noopener noreferrer"
    className="dei-fab"
    aria-label="Ir a la tienda Don Elí"
  >
    <span className="dei-fab-ico">🛒</span>
    <span className="dei-fab-txt">Tienda Don Elí</span>
  </a>
);

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════

const DonEliBrewAssistant: React.FC = () => {
  const [metodo, setMetodo] = useState<MetodoId>('v60');
  const [gramos, setGramos] = useState<number>(18);
  const [ratio,  setRatio]  = useState<number>(15);

  return (
    <>
      {/* CSS global auto-contenido */}
      <style>{ESTILOS_GLOBALES}</style>

      {/* ── HEADER ── */}
      <header className="dei-header">
        <p className="dei-h-eye">☕ Santander · Colombia</p>
        <h1 className="dei-h-title">Don Elí: <em>Brew</em> Assistant</h1>
        <p className="dei-h-sub">Calculadora profesional de extracción para café de especialidad</p>
        <div className="dei-h-line" />
      </header>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <main className="dei-main">

        {/* Anuncio superior */}
        <AdSlot slot={ADSENSE_SLOT_TOP} />

        {/* 1. Selector de métodos */}
        <SelectorMetodos metodoActivo={metodo} onChange={setMetodo} />

        {/* 2. Parámetros */}
        <Calculadora gramos={gramos} setGramos={setGramos} ratio={ratio} setRatio={setRatio} />

        {/* 3. Resultado */}
        <Resultado gramos={gramos} ratio={ratio} />

        {/* 4. Guía técnica */}
        <GuiaTecnica metodoId={metodo} />

        {/* 5. Tarjeta de receta compartible */}
        <SepSeccion label="Comparte tu receta" />
        <div className="dei-card">
          <TarjetaReceta gramos={gramos} ratio={ratio} metodoId={metodo} />
        </div>

        {/* Separador + Anuncio cuadrado */}
        <SepSeccion label="Patrocinado" />
        <AdSlot slot={ADSENSE_SLOT_MID} cuadrado />

        {/* ── ECOMMERCE ── */}
        <SepSeccion label="Nuestra Tienda" />

        {/* Banner hero de la tienda */}
        <ShopHero />

        {/* Tarjetas de productos */}
        <TarjetasProductos />

      </main>

      {/* ── BLOG DESTACADO ── */}
      <BlogHero />

      {/* ── FOOTER SEO ── */}
      <FooterInfo />

      {/* ── BOTÓN FLOTANTE (siempre visible) ── */}
      <BotonFlotante />
    </>
  );
};

export default DonEliBrewAssistant;
