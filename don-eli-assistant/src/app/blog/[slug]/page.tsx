import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImpactChart from '../../components/ImpactChart';

// ══════════════════════════════════════════════════════════════
// TIPOS
// ══════════════════════════════════════════════════════════════

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'list'; items: string[] }
  | { type: 'chart' };

interface CostItem   { label: string; value: number; unit: string; color: string }
interface KeyMetric  { label: string; value: string; unit: string; icon: string }
interface ArabicaPoint { mes: string; arabica: number; robusta: number }

interface ChartData {
  costsImpact: CostItem[];
  keyMetrics: KeyMetric[];
  arabicaVsRobusta: ArabicaPoint[];
}

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  content: ContentBlock[];
  chartData?: ChartData;
}

// ══════════════════════════════════════════════════════════════
// DATOS INLINE
// ══════════════════════════════════════════════════════════════

const POSTS: Post[] = [
  {
    slug: 'tormenta-en-el-estrecho',
    title: 'Tormenta en el Estrecho: El Efecto Dominó del Conflicto en el Medio Oriente sobre el Café Colombiano',
    excerpt: 'Los ataques hutíes en el Mar Rojo y las tensiones en el Golfo Pérsico han disparado los fletes marítimos un 140%, encarecido los fertilizantes un 22% y añadido 12 días a la ruta del café colombiano hacia Europa. Un análisis del impacto real en los bolsillos de 540.000 caficultores.',
    date: '2026-04-09',
    author: 'Redacción Económica',
    tags: ['mercado', 'logística', 'Colombia', 'geopolítica'],
    readTime: 8,
    content: [
      { type: 'paragraph', text: 'A más de 11.000 kilómetros de los cafetales santandereanos, en las frías aguas del Mar Rojo, un misil antitanque lanzado desde las costas del Yemen puede encarecer el tinto que usted toma esta mañana. La geopolítica y el café llevan décadas entrelazados, pero el escalamiento del conflicto en el Medio Oriente ha creado una tormenta perfecta que golpea con fuerza inusual a los 540.000 caficultores colombianos.' },
      { type: 'heading', level: 2, text: 'El Estrecho que Mueve el Mundo' },
      { type: 'paragraph', text: 'El Canal de Suez y el estrecho de Bab-el-Mandeb son las dos bisagras sobre las que gira el comercio marítimo entre Asia, Europa y América. Por esta ruta transitan cada año más de 17.000 buques, el equivalente al 12% del comercio mundial y el 30% del tráfico de contenedores del planeta. Para Colombia, este corredor es la autopista invisible que conecta sus puertos del Pacífico y el Caribe con los mercados compradores de Europa Occidental —Alemania, Italia, Francia y España, los grandes tostadores del arábica colombiano.' },
      { type: 'paragraph', text: 'Desde finales de 2023, los ataques de las milicias hutíes de Yemen a buques comerciales en el Mar Rojo obligaron a las principales navieras —Maersk, MSC, CMA CGM, Hapag-Lloyd— a desviar sus flotas alrededor del Cabo de Buena Esperanza en Sudáfrica. Un rodeo de aproximadamente 8.500 kilómetros adicionales que transforma una travesía de 14 días en un viaje de 26. Doce días más de flete, combustible, seguro marítimo y capital inmovilizado.' },
      { type: 'quote', text: 'El desvío por el Cabo de Buena Esperanza no es solo un problema de tiempo: es un problema de costos compuestos. Cada día adicional en el mar es flete, seguro, combustible y taza de café que llega más cara al consumidor europeo.', source: 'Análisis de la Federación Nacional de Cafeteros, Q1 2026' },
      { type: 'heading', level: 2, text: 'El Precio de la Distancia: Fletes que se Dispararon 140%' },
      { type: 'paragraph', text: 'El índice Freightos Baltic de fletes marítimos en contenedores de 40 pies en la ruta Asia–Europa Norte alcanzó picos históricos durante 2024 y mantuvo niveles elevados durante 2025 y principios de 2026. Para los exportadores colombianos, el costo de enviar un contenedor de café verde desde Buenaventura hasta Bremen o Hamburgo pasó de cerca de 2.100 USD a más de 5.000 USD —un incremento superior al 140%.' },
      { type: 'paragraph', text: 'Pero el golpe no termina en el flete. El seguro marítimo para rutas que bordean zonas de conflicto se multiplicó por tres. Las primas de riesgo de guerra —antes casi simbólicas en aguas del Índico— hoy representan una línea de costo real en los balances de las comercializadoras. Para las exportadoras medianas, que trabajan con márgenes ajustados y financian la cosecha con crédito de corto plazo, el impacto sobre el flujo de caja es inmediato y doloroso.' },
      { type: 'chart' },
      { type: 'heading', level: 2, text: 'La Cadena del Fertilizante: 22% Más Caro para Producir' },
      { type: 'paragraph', text: 'Colombia importa cerca del 70% de los fertilizantes que consumen sus caficultores. La urea —el insumo nitrogenado fundamental para el cultivo del café— proviene en buena medida de Rusia, Medio Oriente y el sudeste asiático. Las rutas marítimas comprometidas y las sanciones cruzadas derivadas del conflicto regional encarecieron la urea un 22% entre enero de 2025 y marzo de 2026, según datos del Sistema de Información de Precios del Sector Agropecuario (SIPSA).' },
      { type: 'paragraph', text: 'Para un caficultor de Santander que maneja 3 hectáreas y aplica en promedio 250 kilogramos de fertilizante por hectárea al año, el incremento representa un sobrecosto de entre 180.000 y 240.000 pesos por ciclo productivo —una suma que puede equivaler al ingreso neto de una semana de trabajo. En un sector donde el 78% de los productores son pequeños caficultores con menos de 5 hectáreas, este tipo de choques de costos no son estadística: son facturas sin pagar.' },
      { type: 'heading', level: 2, text: 'Petróleo a 120 Dólares: El Costo Invisible del Transporte Interno' },
      { type: 'paragraph', text: 'El Brent cruzó los 120 USD por barril en varias ocasiones durante 2025, presionado por la incertidumbre geopolítica, los recortes de la OPEP+ y la especulación de mercado. En Colombia, el precio del ACPM —el combustible de los camiones que llevan el café desde las veredas cafeteras hasta los centros de beneficio y los puertos de exportación— siguió al alza con rezago, pero con fuerza. El costo del transporte terrestre de carga subió un 18% promedio entre Huila-Bogotá y Antioquia-Buenaventura, erosionando el margen bruto de los exportadores y trasladando presión hacia abajo en la cadena, sobre los intermediarios y eventualmente sobre el precio pagado en finca.' },
      { type: 'heading', level: 2, text: 'La Prima del Arábica Colombiano: Una Ventaja que Resiste' },
      { type: 'paragraph', text: 'No todo es sombrío. Mientras el conflicto encadena los costos logísticos, el arábica lavado colombiano —el perfil de taza que distingue al café de Santander, Huila, Nariño y Antioquia— ha visto crecer su prima diferencial sobre el robusta asiático. El robusta de Vietnam e Indonesia, que domina el mercado del café soluble y las mezclas de precio bajo, también enfrenta sus propias disrupciones logísticas en el Mar del Sur de China y el Índico.' },
      { type: 'paragraph', text: 'El resultado es una divergencia de precios: mientras el robusta se mueve entre 190 y 215 centavos de dólar por libra, el arábica colombiano de especialidad cotiza por encima de los 400 centavos en algunos contratos diferenciados —una prima de casi el 100% que refleja la preferencia de los tostadores europeos por orígenes confiables, trazables y con perfiles organolépticos definidos. Para los productores santandereanos que trabajan bajo certificaciones de origen, este diferencial es un colchón que amortigua, aunque no anula, el impacto de los costos logísticos.' },
      { type: 'heading', level: 2, text: 'El Caficultor en el Ojo del Huracán' },
      { type: 'paragraph', text: 'En las veredas del Cañón del Chicamocha, del Páramo de Berlín o de la Mesa de los Santos, la geopolítica llega en forma de precio de compra por carga. El caficultor no negocia el flete, no contrata el seguro marítimo y no paga la factura de la urea en dólares —pero los absorbe todos, traducidos en un precio en finca que no siempre cubre los costos de producción.' },
      { type: 'paragraph', text: 'La Federación Nacional de Cafeteros activó a principios de 2026 un programa de subsidio parcial a fertilizantes para mitigar el choque de precios, y las cooperativas cafeteras de la región negociaron volúmenes de compra anticipada con proveedores brasileños —una alternativa parcial que reduce la dependencia de rutas asiáticas, aunque a un costo todavía superior al promedio histórico.' },
      { type: 'list', items: [
        'Las ventas externas de café colombiano cayeron 4,2% en volumen durante el primer trimestre de 2026 frente al mismo período de 2025.',
        'El precio interno de compra al productor promedió 1.985.000 COP por carga de 125 kg en marzo de 2026, por debajo del costo de producción estimado por la FNC en 2.120.000 COP.',
        'El 34% de los caficultores encuestados por Cenicafé reportó haber reducido la dosis de fertilización en el último ciclo por restricciones presupuestales.',
        'Las cooperativas del nororiente colombiano acumulan inventarios que superan en 18% el promedio histórico de la época, dificultando la gestión del capital de trabajo.',
      ]},
      { type: 'heading', level: 2, text: 'Perspectivas: Adaptar o Esperar' },
      { type: 'paragraph', text: 'El conflicto en el Medio Oriente no tiene fecha de cierre visible. Los analistas de mercados de materias primas de Goldman Sachs y Citigroup estiman que las disrupciones logísticas en el Mar Rojo podrían extenderse al menos hasta 2027, con episodios de escalamiento que mantendrán la volatilidad en los fletes. Para el sector cafetero colombiano, la adaptación pasa por tres frentes: diversificación de rutas de exportación hacia puertos del Pacífico con acceso directo a mercados asiáticos en crecimiento; industrialización local para exportar café procesado y no solo verde; y desarrollo de proveedores domésticos o latinoamericanos de insumos agrícolas que reduzcan la dependencia de rutas comprometidas.' },
      { type: 'paragraph', text: 'En el corto plazo, sin embargo, el margen de maniobra del pequeño caficultor es limitado. La apuesta sigue siendo la calidad: en un mercado global convulsionado, el café de origen colombiano con trazabilidad, perfil sensorial documentado y relaciones directas con tostadores especializados es el único activo que no depende de si hay paz o guerra en el estrecho de Bab-el-Mandeb.' },
      { type: 'quote', text: 'Cuando el mundo se complica, el café de calidad se convierte en refugio. Los compradores europeos pagan la prima porque saben exactamente qué están comprando. Esa certeza vale más que un flete barato.', source: 'Director comercial, exportadora del nororiente colombiano' },
    ],
    chartData: {
      costsImpact: [
        { label: 'Fletes Marítimos',    value: 140, unit: '%', color: '#9B2226' },
        { label: 'Prima Arábica Col.',  value: 85,  unit: '%', color: '#C59D5F' },
        { label: 'Petróleo Brent',      value: 68,  unit: '%', color: '#AE5F00' },
        { label: 'Transporte Terrestre',value: 18,  unit: '%', color: '#6B3E26' },
        { label: 'Fertilizantes',       value: 22,  unit: '%', color: '#4B2C20' },
      ],
      keyMetrics: [
        { label: 'Días Extra Navegación', value: '+12',   unit: 'días',        icon: '🚢' },
        { label: 'Petróleo Brent',        value: '>120',  unit: 'USD/barril',  icon: '🛢️' },
        { label: 'Km Ruta Extra',         value: '+8.500',unit: 'km',          icon: '🗺️' },
        { label: 'Seguro Marítimo',       value: '×3',    unit: 'multiplicado',icon: '📋' },
      ],
      arabicaVsRobusta: [
        { mes: 'Ene 25', arabica: 285, robusta: 190 },
        { mes: 'Mar 25', arabica: 310, robusta: 192 },
        { mes: 'May 25', arabica: 335, robusta: 196 },
        { mes: 'Jul 25', arabica: 358, robusta: 200 },
        { mes: 'Sep 25', arabica: 372, robusta: 203 },
        { mes: 'Nov 25', arabica: 388, robusta: 206 },
        { mes: 'Ene 26', arabica: 396, robusta: 208 },
        { mes: 'Mar 26', arabica: 410, robusta: 210 },
        { mes: 'Abr 26', arabica: 418, robusta: 212 },
      ],
    },
  },
];

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════

function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ══════════════════════════════════════════════════════════════
// STATIC PARAMS
// ══════════════════════════════════════════════════════════════

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
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
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background-color: var(--bg);
    background-image:
      radial-gradient(ellipse at 15% 10%, rgba(197,157,95,.13) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 85%, rgba(75,44,32,.07) 0%, transparent 55%);
    color: var(--cafe);
  }
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
  .ap-nav { display:flex; align-items:center; gap:.5rem; margin-bottom:1.2rem; position:relative; z-index:1; }
  .ap-nav a { font-size:.65rem; font-weight:600; letter-spacing:.06em; color:rgba(197,157,95,.7); text-decoration:none; }
  .ap-nav a:hover { color:var(--oro); }
  .ap-nav-sep { font-size:.6rem; color:rgba(197,157,95,.35); }
  .ap-nav-current { font-size:.65rem; color:rgba(245,230,211,.35); }
  .ap-tags { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:.85rem; position:relative; z-index:1; }
  .ap-tag { font-size:.57rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--oro); background:rgba(197,157,95,.15); border:1px solid rgba(197,157,95,.3); border-radius:50px; padding:.2rem .65rem; }
  .ap-title { font-family:'Playfair Display',serif; font-size:clamp(1.5rem,6vw,2.3rem); font-weight:700; color:var(--bg); line-height:1.2; margin-bottom:.9rem; position:relative; z-index:1; }
  .ap-meta { display:flex; align-items:center; gap:.7rem; flex-wrap:wrap; position:relative; z-index:1; }
  .ap-meta-item { font-size:.65rem; color:rgba(245,230,211,.5); font-weight:300; display:flex; align-items:center; gap:.25rem; }
  .ap-meta-item strong { color:rgba(245,230,211,.8); font-weight:500; }
  .ap-meta-dot { width:3px; height:3px; border-radius:50%; background:rgba(197,157,95,.4); }
  .ap-body { max-width:600px; margin:0 auto; padding:1.8rem 1rem 3rem; display:flex; flex-direction:column; gap:1.1rem; }
  .ap-p { font-size:.9rem; line-height:1.85; color:rgba(75,44,32,.85); }
  .ap-h2 { font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; color:var(--cafe); line-height:1.25; padding-top:.4rem; border-top:2px solid rgba(197,157,95,.2); }
  .ap-h3 { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:600; color:var(--cafe); }
  .ap-quote { background:var(--cafe); border-radius:12px; padding:1.2rem 1.3rem; position:relative; overflow:hidden; }
  .ap-quote::before { content:'"'; position:absolute; top:-.4rem; left:.6rem; font-family:'Playfair Display',serif; font-size:5rem; color:rgba(197,157,95,.18); line-height:1; pointer-events:none; }
  .ap-quote-text { font-family:'Playfair Display',serif; font-size:.9rem; font-style:italic; color:var(--bg); line-height:1.7; position:relative; z-index:1; }
  .ap-quote-source { font-size:.62rem; color:var(--oro); font-weight:500; margin-top:.6rem; font-style:normal; display:block; position:relative; z-index:1; }
  .ap-list { background:var(--bl); border-radius:12px; padding:1rem 1.2rem; border:1px solid rgba(197,157,95,.18); box-shadow:0 2px 12px rgba(75,44,32,.07); }
  .ap-list ul { list-style:none; display:flex; flex-direction:column; gap:.65rem; padding:0; margin:0; }
  .ap-list ul li { font-size:.82rem; line-height:1.6; color:rgba(75,44,32,.8); padding-left:1.1rem; position:relative; }
  .ap-list ul li::before { content:''; position:absolute; left:0; top:.55rem; width:6px; height:6px; border-radius:50%; background:var(--oro); }
  .ap-chart-wrap { background:var(--bl); border-radius:16px; padding:1.4rem 1.1rem; border:1px solid rgba(197,157,95,.18); box-shadow:0 4px 24px rgba(75,44,32,.1); }
  .ap-footer { margin-top:.5rem; padding-top:1.2rem; border-top:1px solid rgba(197,157,95,.2); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:.75rem; }
  .ap-footer-back { display:inline-flex; align-items:center; gap:.3rem; font-size:.72rem; font-weight:600; color:var(--oro); text-decoration:none; border:1.5px solid rgba(197,157,95,.35); border-radius:50px; padding:.38rem .9rem; transition:background .2s; }
  .ap-footer-back:hover { background:rgba(197,157,95,.1); }
  .ap-footer-note { font-size:.62rem; color:rgba(75,44,32,.35); font-style:italic; }
`;

// ══════════════════════════════════════════════════════════════
// RENDER DE BLOQUES
// ══════════════════════════════════════════════════════════════

function RenderBlock({ block, chartData }: { block: ContentBlock; chartData?: ChartData }) {
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
          <ul>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
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

      <header className="ap-header">
        <nav className="ap-nav">
          <Link href="/">Inicio</Link>
          <span className="ap-nav-sep">›</span>
          <Link href="/blog">Blog</Link>
          <span className="ap-nav-sep">›</span>
          <span className="ap-nav-current">{post.slug}</span>
        </nav>
        <div className="ap-tags">
          {post.tags.map((tag) => <span key={tag} className="ap-tag">{tag}</span>)}
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
