"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
interface IProvidersProps {
  children: React.ReactNode;
}
const Providers = ({ children }: IProvidersProps) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};

export default Providers;
