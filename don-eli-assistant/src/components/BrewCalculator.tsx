'use client';
import React, { useState } from 'react';

const METODOS = [
  { id:'v60', nombre:'V60', tipo:'Pour Over', icono:'☕', molienda:'Media-Fina', temp:'92–94°C', tiempo:'2:30–3:30 min', nota:'Vierte en espiral desde el centro. Bloom de 30s.' },
  { id:'chemex', nombre:'Chemex', tipo:'Filtro Grueso', icono:'🫙', molienda:'Media-Gruesa', temp:'93–96°C', tiempo:'4:00–5:00 min', nota:'El filtro Chemex retiene más aceites. Taza limpia y brillante.' },
  { id:'prensa', nombre:'Prensa Francesa', tipo:'Inmersión', icono:'🧪', molienda:'Gruesa', temp:'90–94°C', tiempo:'4:00 min', nota:'Sumerge todo el café. Presiona el émbolo lentamente.' },
  { id:'aeropress', nombre:'AeroPress', tipo:'Presión', icono:'💨', molienda:'Media', temp:'80–85°C', tiempo:'1:30–2:30 min', nota:'Versátil y rápida. Prueba la técnica invertida.' }
];

export default function BrewCalculator() {
  const [metodo, setMetodo] = useState(METODOS[0]);
  const [gramos, setGramos] = useState(18);
  const [ratio, setRatio] = useState(15);

  const agua = gramos * ratio;
  const tazas = (gramos / 7).toFixed(1);

  return (
    <div className="flex flex-col gap-5 w-full max-w-[600px] mx-auto pb-10">
      
      {/* TARJETA MÉTODOS */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#C59D5F]/20">
        <h3 className="font-bold text-[#4B2C20] mb-4 flex items-center gap-2 italic">
          <span className="bg-[#F5E6D3] p-1 rounded-md text-sm text-black">🎯</span> Método de Extracción
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {METODOS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMetodo(m)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                metodo.id === m.id ? 'border-[#C59D5F] bg-[#4B2C20] text-white' : 'border-[#C59D5F]/20 bg-[#F5E6D3]'
              }`}
            >
              <span className="text-2xl mb-1">{m.icono}</span>
              <span className={`text-xs font-bold ${metodo.id === m.id ? 'text-[#C59D5F]' : 'text-[#4B2C20]'}`}>{m.nombre}</span>
              <span className="text-[10px] opacity-60 uppercase">{m.tipo}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TARJETA PARÁMETROS */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#C59D5F]/20">
        <h3 className="font-bold text-[#4B2C20] mb-6 flex items-center gap-2 italic">
          <span className="bg-[#F5E6D3] p-1 rounded-md text-sm text-black">⚖️</span> Parámetros
        </h3>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-[#4B2C20]">CAFÉ: {gramos}g</span>
          </div>
          <input type="range" min="8" max="60" value={gramos} onChange={(e) => setGramos(parseInt(e.target.value))} className="w-full accent-[#C59D5F]" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-[#4B2C20]">RATIO: 1:{ratio}</span>
          </div>
          <input type="range" min="10" max="20" value={ratio} onChange={(e) => setRatio(parseInt(e.target.value))} className="w-full accent-[#C59D5F]" />
        </div>
      </div>

      {/* TARJETA RESULTADO (ESTILO PREMIUM DON ELÍ) */}
      <div className="bg-[#4B2C20] rounded-3xl p-8 text-center shadow-2xl">
        <p className="text-[#C59D5F] uppercase text-[10px] tracking-widest font-bold mb-2">Agua Total Necesaria</p>
        <div className="text-6xl font-black text-[#F5E6D3] mb-6">{agua}<span className="text-2xl ml-1">ml</span></div>
        <div className="flex justify-around border-t border-[#C59D5F]/20 pt-6">
          <div><p className="text-[#F5E6D3] font-bold">{gramos}g</p><p className="text-[9px] text-white/40 uppercase">Café</p></div>
          <div><p className="text-[#F5E6D3] font-bold">1:{ratio}</p><p className="text-[9px] text-white/40 uppercase">Ratio</p></div>
          <div><p className="text-[#F5E6D3] font-bold">{tazas}</p><p className="text-[9px] text-white/40 uppercase">Tazas</p></div>
        </div>
      </div>

      {/* GUÍA TÉCNICA */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-[#C59D5F]">
        <h4 className="text-[#4B2C20] font-bold mb-4 italic text-sm">Guía Técnica: {metodo.nombre}</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#F5E6D3] p-3 rounded-xl text-center">
            <p className="text-[8px] font-bold text-[#C59D5F] uppercase">Molienda</p>
            <p className="text-[10px] font-bold text-[#4B2C20]">{metodo.molienda}</p>
          </div>
          <div className="bg-[#F5E6D3] p-3 rounded-xl text-center">
            <p className="text-[8px] font-bold text-[#C59D5F] uppercase">Temp</p>
            <p className="text-[10px] font-bold text-[#4B2C20]">{metodo.temp}</p>
          </div>
          <div className="bg-[#F5E6D3] p-3 rounded-xl text-center">
            <p className="text-[8px] font-bold text-[#C59D5F] uppercase">Tiempo</p>
            <p className="text-[10px] font-bold text-[#4B2C20]">{metodo.tiempo}</p>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-[#4B2C20]/70 italic">💡 {metodo.nota}</p>
      </div>
    </div>
  );
}