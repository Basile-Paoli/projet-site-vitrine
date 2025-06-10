import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function Layout() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
