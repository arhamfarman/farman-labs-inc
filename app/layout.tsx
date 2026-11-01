import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.farmanlabs.com"),
  title: { default: "Farman Labs Inc. | Modern Software Infrastructure for Physical Operations", template: "%s | Farman Labs" },
  description: "Portals, automations and live dashboards for businesses that move, make and store real things.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body className="bg-white font-sans text-body text-navy antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
