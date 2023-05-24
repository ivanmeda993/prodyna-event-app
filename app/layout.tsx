import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/app/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prodyna Events App",
  description: "Prodyna Events App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
