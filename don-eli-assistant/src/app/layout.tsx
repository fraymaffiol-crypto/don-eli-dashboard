import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const BASE_URL = "https://blog.donelicafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Calculadora de Café | Ratio, Extracción y Métodos — Don Elí",
    template: "%s — Don Elí Café de Especialidad",
  },
  description:
    "Calcula el ratio perfecto de café, gramos por taza y temperatura de extracción para V60, Chemex, French Press y más. Guía de café de especialidad colombiano y latinoamericano.",
  keywords: [
    "calculadora de café",
    "ratio café agua",
    "café de especialidad",
    "café colombiano",
    "extracción de café",
    "V60",
    "Chemex",
    "French Press",
    "gramos por taza",
    "temperatura ideal café",
    "café de especialidad Colombia",
    "café de especialidad latinoamérica",
    "brew ratio",
    "specialty coffee",
    "Don Elí café",
    "café de filtro",
    "recetas de café",
    "barista",
  ],
  authors: [{ name: "Don Elí Café de Especialidad", url: BASE_URL }],
  creator: "Don Elí Café de Especialidad",
  publisher: "Don Elí Café de Especialidad",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: BASE_URL,
    siteName: "Don Elí Café de Especialidad",
    title: "Calculadora de Café | Ratio, Extracción y Métodos — Don Elí",
    description:
      "Calcula el ratio perfecto de café, gramos por taza y temperatura de extracción para V60, Chemex, French Press y más. Café de especialidad colombiano.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Don Elí — Calculadora de Café de Especialidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Café | Ratio, Extracción y Métodos — Don Elí",
    description:
      "Calcula el ratio perfecto de café, gramos por taza y temperatura de extracción para V60, Chemex, French Press y más.",
    images: ["/og-image.jpg"],
    creator: "@donelicafe",
    site: "@donelicafe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "CO",
    "geo.country": "CO",
    "geo.placename": "Colombia",
    "DC.language": "es",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es el ratio de café?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El ratio de café es la proporción entre la cantidad de café molido y el agua utilizada para prepararlo. El estándar de la Specialty Coffee Association (SCA) recomienda un ratio de 1:15 a 1:18, es decir, entre 55 y 60 gramos de café por litro de agua. Un ratio más bajo produce una taza más concentrada, mientras que uno más alto resulta en una bebida más suave.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuántos gramos de café se necesitan por taza?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para una taza de café de 250 ml, se recomienda usar entre 14 y 18 gramos de café molido, dependiendo del método de preparación y el ratio deseado. Para espresso (30 ml), se usan entre 7 y 10 gramos. Para café de filtro como el V60, un buen punto de partida es 15 gramos por 250 ml de agua.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es la temperatura ideal para preparar café?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La temperatura ideal para preparar café de especialidad es entre 90°C y 96°C (194°F–205°F). Temperaturas más bajas resultan en una extracción insuficiente con sabores ácidos y planos, mientras que temperaturas más altas provocan sobreextracción y sabores amargos. Para cafés de tostado claro, se recomienda 94–96°C; para tostados oscuros, 90–92°C.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo preparar café en V60?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para preparar café en V60: 1) Usa 15g de café molido medio-fino por 250ml de agua a 93°C. 2) Coloca el filtro en el V60 y enjuágalo con agua caliente. 3) Agrega el café molido y haz un preinfusión con 30ml de agua durante 30–45 segundos (bloom). 4) Vierte el resto del agua en espirales lentas hasta completar 250ml. 5) El tiempo total debe ser 2:30–3:30 minutos. El resultado es una taza limpia, brillante y con sabores definidos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es el café de especialidad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El café de especialidad es café que obtiene una puntuación de 80 puntos o más en la escala de la Specialty Coffee Association (SCA). Se cultiva en zonas con condiciones geográficas excepcionales, se cosecha en el punto exacto de madurez, se procesa cuidadosamente y se tuesta para resaltar sus características únicas de origen. Colombia es uno de los principales productores de café de especialidad del mundo, con regiones como Huila, Nariño y Antioquia reconocidas internacionalmente.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
