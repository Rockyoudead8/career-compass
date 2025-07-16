import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({
  subsets: ["latin"]
});
export const metadata = {
  title: "Your Carrer Compass",
  description: "Your personal career guide, powered by AI.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={
      {
        baseTheme: dark,
      }
    }>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen pt-30">
              <div className="grid-background"></div>
              <Toaster />
              {children}
            </main>
            <Footer />

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
