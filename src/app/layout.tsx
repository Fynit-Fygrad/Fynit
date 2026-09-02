import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import "./legacy-styles.css"; // Imported original styles

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fynit | Impulsa tu Investigación Científica",
  description: "Fynit ayuda a investigadores a evaluar y corregir sus artículos científicos antes de enviarlos a revistas top (Scopus, WoS) mediante herramientas automatizadas.",
  icons: {
    icon: "/assets/logos svg/favicon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="lazyOnload" />
        <Script src="/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
