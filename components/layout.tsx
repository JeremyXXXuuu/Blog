// import '../styles/globals.css'
import Navbar from "./navbar";

export const metadata = {
  title: {
    default: "",
    template: "",
  },
  description: "Developer, writer, and creator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-w-full grid grid-cols-4 gap-6">
      <div className="col-span-1 justify-self-end mt-12">
        <Navbar />
      </div>
      <div className="col-span-3 mt-12 ml-6 ">{children}</div>
    </div>
  );
}
