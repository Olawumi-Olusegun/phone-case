import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Case",
  description: "Create a custom phone case with your preferred image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="w-full min-h-[calc(100vh_-_3.5rem_-_1px)] flex flex-col ">
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
