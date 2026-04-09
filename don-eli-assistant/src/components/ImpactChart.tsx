'use client';

import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, CartesianGrid, Legend,
} from 'recharts';
import type { ChartData } from '@/lib/posts';

// ══════════════════════════════════════════════════════════════
// CSS
// ══════════════════════════════════════════════════════════════

const ESTILOS = `
  .ic-wrap {
    --bg:   #F5E6D3;
    --cafe: #4B2C20;
    --oro:  #C59D5F;
    --bl:   #FFFFFF;
    --rojo: #9B2226;
    --verde:#2D6A4F;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /* ── HEADER ── */
  .ic-header {
    border-left: 4px solid var(--oro);
    padding: .5rem 0 .5rem .9rem;
  }
  .ic-eyebrow {
    font-size: .58rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: .2rem;
  }
  .ic-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--cafe);
    line-height: 1.25;
  }

  /* ── TABS ── */
  .ic-tabs {
    display: flex;
    gap: .4rem;
    flex-wrap: wrap;
  }
  .ic-tab {
    padding: .32rem .9rem;
    border-radius: 50px;
    border: 1.5px solid rgba(197,157,95,.35);
    background: var(--bg);
    font-size: .7rem;
    font-weight: 600;
    color: var(--cafe);
    cursor: pointer;
    transition: all .2s;
    font-family: inherit;
  }
  .ic-tab:hover, .ic-tab.on {
    background: var(--cafe);
    border-color: var(--cafe);
    color: var(--oro);
  }

  /* ── PANEL ── */
  .ic-panel {
    background: var(--bl);
    border-radius: 16px;
    border: 1px solid rgba(197,157,95,.18);
    box-shadow: 0 4px 24px rgba(75,44,32,.1);
    padding: 1.2rem 1rem;
  }
  .ic-panel-title {
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--oro);
    margin-bottom: 1rem;
  }

  /* ── MÉTRICAS CLAVE ── */
  .ic-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .65rem;
    margin-top: .2rem;
  }
  .ic-metric {
    background: var(--bg);
    border-radius: 12px;
    padding: .85rem .75rem;
    border: 1px solid rgba(197,157,95,.2);
    display: flex;
    flex-direction: column;
    gap: .2rem;
  }
  .ic-metric-ico { font-size: 1.4rem; line-height: 1; margin-bottom: .15rem; }
  .ic-metric-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--rojo);
    line-height: 1;
  }
  .ic-metric-unit { font-size: .6rem; font-weight: 400; color: var(--oro); }
  .ic-metric-lbl { font-size: .65rem; font-weight: 500; color: rgba(75,44,32,.65); margin-top: .15rem; line-height: 1.3; }

  /* ── TOOLTIP CUSTOM ── */
  .ic-tooltip {
    background: var(--cafe);
    border: none;
    border-radius: 10px;
    padding: .5rem .85rem;
  }
  .ic-tooltip-label { font-size: .65rem; font-weight: 600; color: var(--oro); margin-bottom: .15rem; letter-spacing: .08em; }
  .ic-tooltip-val { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--bg); }
  .ic-tooltip-unit { font-size: .6rem; color: rgba(245,230,211,.6); }

  /* ── LEYENDA ── */
  .ic-legend {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    margin-top: .6rem;
    flex-wrap: wrap;
  }
  .ic-legend-item {
    display: flex;
    align-items: center;
    gap: .35rem;
    font-size: .65rem;
    font-weight: 500;
    color: rgba(75,44,32,.7);
  }
  .ic-legend-dot {
    width: 10px; height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ── NOTA ── */
  .ic-note {
    font-size: .65rem;
    color: rgba(75,44,32,.4);
    font-style: italic;
    margin-top: .8rem;
    text-align: center;
  }
`;

// ══════════════════════════════════════════════════════════════
// TOOLTIP PERSONALIZADO
// ══════════════════════════════════════════════════════════════

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
  unit?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label, unit = '%' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="ic-tooltip">
      <p className="ic-tooltip-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="ic-tooltip-val">
          +{p.value}<span className="ic-tooltip-unit"> {unit}</span>
        </p>
      ))}
    </div>
  );
};

const PremiumTooltip: React.FC<Omit<TooltipProps, 'payload'> & { payload?: { value: number; name: string; color?: string }[] }> = ({
  active, payload, label,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="ic-tooltip">
      <p className="ic-tooltip-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="ic-tooltip-val" style={{ color: p.color ?? '#F5E6D3' }}>
          {p.value}<span className="ic-tooltip-unit"> ¢/lb</span>
        </p>
      ))}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════

interface ImpactChartProps {
  data: ChartData;
}

const TABS = [
  { id: 'costos',   label: '📈 Impacto en Costos' },
  { id: 'metricas', label: '📊 Indicadores Clave' },
  { id: 'prima',    label: '☕ Arábica vs Robusta' },
] as const;

type TabId = typeof TABS[number]['id'];

const ImpactChart: React.FC<ImpactChartProps> = ({ data }) => {
  const [tab, setTab] = useState<TabId>('costos');

  return (
    <div className="ic-wrap">
      <style>{ESTILOS}</style>

      <div className="ic-header">
        <p className="ic-eyebrow">Análisis de Impacto</p>
        <p className="ic-title">Indicadores del Conflicto sobre el Café Colombiano</p>
      </div>

      {/* Tabs */}
      <div className="ic-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`ic-tab${tab === t.id ? ' on' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel: Impacto en Costos */}
      {tab === 'costos' && (
        <div className="ic-panel">
          <p className="ic-panel-title">Variación porcentual de costos · 2024–2026</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data.costsImpact}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: 'rgba(75,44,32,.5)' }}
                tickFormatter={(v) => `+${v}%`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fontSize: 11, fill: '#4B2C20', fontWeight: 500 }}
                width={130}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: 'rgba(197,157,95,.08)' }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22} label={{ position: 'right', formatter: (v: unknown) => `+${v}%`, fontSize: 11, fill: '#4B2C20', fontWeight: 600 }}>
                {data.costsImpact.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="ic-note">Fuentes: Freightos Baltic Index, SIPSA, EIA, FNC · Período Q4 2023 – Q1 2026</p>
        </div>
      )}

      {/* Panel: Indicadores Clave */}
      {tab === 'metricas' && (
        <div className="ic-panel">
          <p className="ic-panel-title">Indicadores operacionales críticos</p>
          <div className="ic-metrics">
            {data.keyMetrics.map((m, i) => (
              <div key={i} className="ic-metric">
                <span className="ic-metric-ico">{m.icon}</span>
                <span className="ic-metric-val">
                  {m.value}
                  <span className="ic-metric-unit"> {m.unit}</span>
                </span>
                <span className="ic-metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
          <p className="ic-note">Datos estimados para la ruta Buenaventura–Bremen vía Cabo de Buena Esperanza vs ruta histórica por Canal de Suez</p>
        </div>
      )}

      {/* Panel: Arábica vs Robusta */}
      {tab === 'prima' && (
        <div className="ic-panel">
          <p className="ic-panel-title">Precio ¢/lb · Arábica colombiano vs Robusta asiático</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data.arabicaVsRobusta} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradArabica" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#C59D5F" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#C59D5F" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="gradRobusta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4B2C20" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4B2C20" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,157,95,.15)" />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: 'rgba(75,44,32,.5)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'rgba(75,44,32,.5)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}¢`} domain={['auto', 'auto']} />
              <Tooltip content={<PremiumTooltip />} />
              <Area type="monotone" dataKey="arabica" name="Arábica Colombiano" stroke="#C59D5F" strokeWidth={2.5} fill="url(#gradArabica)" dot={false} />
              <Area type="monotone" dataKey="robusta" name="Robusta Asiático"   stroke="#4B2C20" strokeWidth={2}   fill="url(#gradRobusta)" dot={false} strokeDasharray="5 3" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="ic-legend">
            <div className="ic-legend-item">
              <div className="ic-legend-dot" style={{ background: '#C59D5F' }} />
              Arábica Colombiano
            </div>
            <div className="ic-legend-item">
              <div className="ic-legend-dot" style={{ background: '#4B2C20' }} />
              Robusta Asiático
            </div>
          </div>
          <p className="ic-note">Precios referenciales en centavos USD por libra · ICE Futures & FNC · Ene 2025 – Abr 2026</p>
        </div>
      )}
    </div>
  );
};

export default ImpactChart;
