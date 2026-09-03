import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toaster from "@/components/Toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
// Global Styles
import "@/styles/variables.css";
import "@/styles/dark-mode.css";
import "@/styles/global.css";

// Layout Styles
import "@/styles/layout/sidebar.css";
import "@/styles/layout/header.css";

// Home Components
import "@/styles/home/hero.css";
import "@/styles/home/marquee.css";
import "@/styles/home/about-how.css";
import "@/styles/home/equipo-home.css";
import "@/styles/home/numbers-mascot.css";
import "@/styles/home/testimonials.css";
import "@/styles/home/pricing.css";

// Footer
import "@/styles/layout/footer.css";

// Page Specific Styles
import "@/styles/pages/blog.css";
import "@/styles/pages/equipo.css";
import "@/styles/pages/contacto.css";
import "@/styles/pages/epic-hero.css";

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
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
