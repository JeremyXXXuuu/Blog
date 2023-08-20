import Navbar from "../components/navbar";
import { Metadata } from 'next'
import Providers from "./provider";
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Jeremy's Blog",
  description: "Jeremy's Blog",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>      
          <Providers>
        <div className="h-screen w-full flex flex-col justify-start md:grid grid-cols-4 gap-6 overflow-auto">
          <div className="ol-span-1 mt-12 justify-self-end">
            <Navbar />
          </div>
          <div className="col-span-3 mt-12 ml-6 overflow-auto">{children}</div>
        </div>
          </Providers>
      </body>
    </html>
  )
}
