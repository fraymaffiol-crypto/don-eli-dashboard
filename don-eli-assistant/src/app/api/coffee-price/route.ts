const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

/** Infiere el estado del mercado a partir de los periodos de negociación del meta. */
function resolveMarketState(meta: Record<string, unknown>): string {
  const now = Math.floor(Date.now() / 1000);
  const periods = meta.currentTradingPeriod as Record<string, { start: number; end: number }> | undefined;
  if (!periods) return 'CLOSED';
  if (periods.regular && now >= periods.regular.start && now <= periods.regular.end) return 'REGULAR';
  if (periods.pre     && now >= periods.pre.start     && now <= periods.pre.end)     return 'PRE';
  if (periods.post    && now >= periods.post.start    && now <= periods.post.end)    return 'POST';
  return 'CLOSED';
}

export async function GET() {
  const url =
    'https://query2.finance.yahoo.com/v8/finance/chart/KC%3DF?interval=1d&range=1d';

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch {
    return Response.json({ error: 'Error de red al obtener datos del mercado' }, { status: 502 });
  }

  if (!res.ok) {
    return Response.json({ error: `Error del proveedor: ${res.status}` }, { status: 502 });
  }

  const data = await res.json();
  const meta = data?.chart?.result?.[0]?.meta as Record<string, unknown> | undefined;

  if (!meta) {
    return Response.json({ error: 'Sin datos de cotización' }, { status: 404 });
  }

  const price     = (meta.regularMarketPrice     as number) ?? null;
  const prevClose = (meta.chartPreviousClose      as number) ?? null;
  const change        = price != null && prevClose != null ? +(price - prevClose).toFixed(4)              : null;
  const changePercent = price != null && prevClose != null ? +((change! / prevClose) * 100).toFixed(4)   : null;

  return Response.json({
    price,
    change,
    changePercent,
    high:        (meta.regularMarketDayHigh   as number) ?? null,
    low:         (meta.regularMarketDayLow    as number) ?? null,
    volume:      (meta.regularMarketVolume    as number) ?? null,
    prevClose,
    time:        (meta.regularMarketTime      as number) ?? null,
    marketState: resolveMarketState(meta),
    name:        (meta.shortName              as string) ?? 'Coffee C Futures',
  });
}
