import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Providers";
import { constructMetaData } from "@/lib/constructMetaData";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetaData()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Providers>
          <main className="w-full grainy-light min-h-[calc(100vh_-_3.5rem_-_1px)] flex flex-col ">
            <Navbar />
              {children}
            <Footer />
          </main>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
