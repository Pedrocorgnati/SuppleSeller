import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SessionTimeoutWrapper from "@/components/SessionTimeoutWrapper";
import Providers from "@/Providers";
import SessionProvider from "@/utils/SessionProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import 'svgmap/dist/svgMap.min.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuppleSeller",
  description: "Gerado por SuppleSeller",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="pt-BR" data-theme="light">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <SessionTimeoutWrapper />
          <Header />
          <Providers>
            {children}
          </Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
