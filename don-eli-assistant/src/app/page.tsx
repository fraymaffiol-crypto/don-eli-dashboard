import Link from "next/link";
import DonEliBrewAssistant from "@/DonEliBrewAssistant";
import CoffeeMarket from "@/components/CoffeeMarket";

export default function Home() {
  return (
    <main>
      <div style={{ padding: "1.4rem 1rem 2.5rem", maxWidth: "600px", margin: "0 auto" }}>
        <CoffeeMarket />
      </div>
      <DonEliBrewAssistant />
      {/* Blog */}
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem 3rem" }}>
        <Link
          href="/blog"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#4B2C20",
            borderRadius: "16px",
            padding: "1.2rem 1.4rem",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(75,44,32,.2)",
          }}
        >
          <div>
            <p style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#C59D5F", marginBottom: ".25rem" }}>
              El Blog del Café
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#F5E6D3", lineHeight: 1.25 }}>
              Mercado · Logística · Geopolítica
            </p>
          </div>
          <span style={{ fontSize: "1.4rem", color: "#C59D5F", flexShrink: 0 }}>→</span>
        </Link>
      </div>
    </main>
  );
}