import { Outlet } from "react-router";
import useSmoothScroll from "../hooks/animation/useSmoothScroll";
import NavBar from "../components/NavBar";

const Layout = () => {
  useSmoothScroll({ autoInit: true });

  return (
    <>
      <header
        className="w-full    min-h-[95px]  fixed top-0 pt-7.5  px-4  left-0 z-[999] flex items-end justify-center"
      >
        <NavBar />
      </header>
      <main className="w-full h-auto min-h-[600vh] bg-white">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
