import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartModal from "./components/CartModal";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DragonJulzArt — Wildlife Art by Juliet Musgrave",
  description:
    "Celebrating wildlife and community through art. Original soft pastel and charcoal paintings, murals, portrait commissions and hand-painted t-shirts by Juliet 'Julz' Musgrave, based in the Mary Valley, QLD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${inter.variable} antialiased`}>
        <CartProvider>
          {children}
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
