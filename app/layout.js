import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/PlanContext";
import { ToastProvider } from "@/lib/ToastContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        <PlanProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </PlanProvider>
      </body>
    </html>
  );
}
