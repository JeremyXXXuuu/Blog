import Navbar from "../components/navbar";
import { Metadata } from "next";
import Providers from "./provider";
import "../styles/globals.css";
import "highlight.js/styles/github.css";

export const metadata: Metadata = {
  title: "Jeremy's Blog",
  description: "Jeremy's Blog",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div
            className={
              "px-6 md:px-6 pt-16 pb-24 md:pt-20 md:pb-44 max-w-[700px] mx-auto"
            }
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
