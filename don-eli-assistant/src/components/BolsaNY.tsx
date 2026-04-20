'use client';

import { useState, useEffect } from 'react';

const INTERVALO_MS = 5 * 60 * 1000;

async function fetchBolsa(): Promise<string> {
  try {
    const res = await fetch('/api/coffee-price', { cache: 'no-store' });
    if (!res.ok) return '--';
    const data = await res.json();
    if (data?.price == null) return '--';
    return (data.price as number).toFixed(2);
  } catch {
    return '--';
  }
}

const ESTILOS = `
  .bny-wrap {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    position: relative;
    z-index: 1;
  }
  .bny-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
    animation: bnyPulse 1.8s ease-in-out infinite;
  }
  @keyframes bnyPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .45; transform: scale(.75); }
  }
  .bny-label {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: .06em;
    color: rgba(245,230,211,.5);
  }
  .bny-precio {
    font-size: 1.3rem;
    font-weight: 700;
    color: #C59D5F;
    letter-spacing: .03em;
  }
  .bny-vivo {
    font-size: .72rem;
    font-weight: 600;
    color: rgba(245,230,211,.4);
    letter-spacing: .05em;
  }
`;

export default function BolsaNY() {
  const [bolsa, setBolsa] = useState<string | null>(null);

  useEffect(() => {
    fetchBolsa().then(setBolsa);
    const timer = setInterval(() => fetchBolsa().then(setBolsa), INTERVALO_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ESTILOS }} />
      <div className="bny-wrap">
        <span className="bny-dot" />
        <span className="bny-label">Bolsa NY:</span>
        <span className="bny-precio">
          {bolsa === null ? '…' : bolsa === '--' ? '--' : `${bolsa} ¢/lb`}
        </span>
        {bolsa !== null && bolsa !== '--' && (
          <span className="bny-vivo">· En vivo</span>
        )}
      </div>
    </>
  );
}
