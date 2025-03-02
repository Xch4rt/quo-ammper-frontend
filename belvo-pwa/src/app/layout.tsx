export const metadata = {
  title: "Belvo PWA",
  description: "Mi PWA con Belvo y Next.js 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
