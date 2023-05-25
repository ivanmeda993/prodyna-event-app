import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/app/providers/Providers";
import EventModal from "@/app/components/modals/EventModal";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
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
        <Providers>
          <EventModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
