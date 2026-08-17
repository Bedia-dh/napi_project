import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

export const metadata: Metadata = {
  title: "NAPI - North Africa Policy Institute",
  description:
    "Independent think tank empowering young North Africans through evidence-based policy research, dialogue, and leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        suppressHydrationWarning
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
