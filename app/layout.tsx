import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ThemeProvider from "@/components/Tools/ThemeProvider";
import ConsoleWarningSuppress from "@/components/Tools/ConsoleWarningSuppress";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://darelmeamar.com'),
  title: {
    default: "Dar El Meamar | Luxury Architectural Design & Construction",
    template: "%s | Dar El Meamar"
  },
  description: "Dar El Meamar is a world-class construction and architectural design firm specializing in luxury residential, commercial, and high-end finishing projects. Leading the future of modern living with innovative designs.",
  keywords: [
    "Villa", "Residential", "Real Estate", "Finishing", "Architecture", "Compounds", "Luxury Living", "Modern Design",
    "فيلا", "سكني", "عقارات", "تشطيب", "عمارة", "كمبوندات", "تصميم عصري", "دار المعمار"
  ],
  authors: [{ name: "Dar El Meamar" }],
  creator: "Dar El Meamar",
  publisher: "Dar El Meamar",
  alternates: {
    canonical: 'https://mhghazy.github.io/dar-elmeamar-next-v2',
    languages: {
      'en-US': 'https://mhghazy.github.io/dar-elmeamar-next-v2/en',
      'ar-EG': 'https://mhghazy.github.io/dar-elmeamar-next-v2/ar',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhghazy.github.io/dar-elmeamar-next-v2",
    siteName: "Dar El Meamar",
    title: "Dar El Meamar | Global Luxury Architectural Excellence",
    description: "Premier global construction and architectural design firm specializing in luxury projects.",
    images: [
      {
        url: "https://mhghazy.github.io/dar-elmeamar-next-v2/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dar El Meamar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dar El Meamar | Luxury Architectural Design & Construction",
    description: "Premier global construction and architectural design firm specializing in luxury projects.",
    images: ["https://mhghazy.github.io/dar-elmeamar-next-v2/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dar El Meamar",
              "url": "https://mhghazy.github.io/dar-elmeamar-next-v2",
              "logo": "https://mhghazy.github.io/dar-elmeamar-next-v2/logo.png",
              "description": "Premier construction and architectural design firm specializing in luxury projects.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+20-XXX-XXXX-XXX",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/darelmeamar",
                "https://www.instagram.com/darelmeamar"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Dar El Meamar",
              "alternateName": "دار المعمار",
              "description": "شركة دار المعمار الرائدة في البناء والتشييد والتصميم المعماري الفاخر بالقاهرة، مصر",
              "url": "https://mhghazy.github.io/dar-elmeamar-next-v2",
              "logo": "https://mhghazy.github.io/dar-elmeamar-next-v2/og-image.jpg",
              "telephone": "+201507412000",
              "email": "info@darelmeamar.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cairo",
                "addressRegion": "Cairo Governorate",
                "addressCountry": "EG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.9755,
                "longitude": 31.5150
              },
              "openingHours": "Mo-Fr 09:00-17:00",
              "priceRange": "$$$$",
              "servedCuisine": null,
              "hasMap": "https://maps.google.com/?q=29.9755,31.5150",
              "sameAs": [
                "https://www.facebook.com/share/1CkkfEbiKA/",
                "https://x.com/darelmeamar",
                "https://www.linkedin.com/company/110319317/",
                "https://www.tiktok.com/@darelmeamar"
              ],
              "knowsLanguage": ["ar", "en"]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <ConsoleWarningSuppress />
            {children}
          </LanguageProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
