import { EB_Garamond, Crimson_Pro, IBM_Plex_Mono } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson-pro',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const metadata = {
  title: 'Justin Guthrie — GeoPortfolio',
  description: 'GIS, GeoAI, and infrastructure resilience research portfolio',
  openGraph: {
    title: 'Justin Guthrie — GeoPortfolio',
    description: 'Mapping what connects — and what breaks.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${crimsonPro.variable} ${ibmPlexMono.variable}`}
    >
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}