import type { Metadata } from "next";
import "./globals.css";
import "@/lib/fontawesome";

export const metadata: Metadata = {
  title: "PrefPalette: Personalized Preference Modeling",
  description: "A simple Next.js site sharing the paper and presentation",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {props.children}
      </body>
    </html>
  );
}
