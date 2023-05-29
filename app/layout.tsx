import "./globals.css";
import { Roboto } from "next/font/google";
import Providers from "@/app/providers/Providers";
import EventModal from "@/app/components/modals/EventModal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-loading-skeleton/dist/skeleton.css";

const roboto = Roboto({
  weight: ["100", "300", "400"],
  subsets: ["latin"],
});

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
      <body className={roboto.className}>
        <Providers>
          <EventModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
