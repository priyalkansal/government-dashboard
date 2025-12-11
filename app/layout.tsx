// app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "ResQNet — Government Dashboard",
  description: "Government dashboard for ResQNet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
