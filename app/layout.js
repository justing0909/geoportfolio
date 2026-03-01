export const metadata = {
  title: 'Justin Guthrie — GeoPortfolio',
  description: 'GIS, GeoAI, and infrastructure resilience research portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}