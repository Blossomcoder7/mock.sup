// import logo from "/logo/brand.svg";
import { IconButton } from "@mui/material";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { useAnimation, useMotionValueEvent, useScroll } from "motion/react";
import type { DrawerRefType } from "./wrapper/Drawer";
import XSpacing from "./wrapper/XSpacing";
import Drawer from "./wrapper/Drawer";
import Logo from "./animated/Logo";
import StartTestingButton from "./btns/StartTestingButton";

const NavBar = () => {
  const drawerEl = useRef<DrawerRefType>(null);
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 400);
  });

  useEffect(() => {
    controls.start({
      y: scrolled ? 0 : -100,
      opacity: scrolled ? 1 : 0,
      transition: {
        duration: 0.6,
        ease: [0.77, 0, 0.175, 1],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  return (
    <>
      <nav
        className={clsx(
          " navbar w-full   items-center relative  justify-center flex   text-mw-sm overflow-hidden h-full"
        )}
      >
        <XSpacing>
          <div className="flex pl-[2.2rem] max-h-[65px] pr-[0.7rem] py-0 items-center shadow-[0_1px_4px_#0003,0_7px_24px_#0000001a]   backdrop-blur-[60px]  bg-black/70 rounded-full justify-between w-full relative z-2 ">
            {/* Mobile logo */}
            <div className="lg:hidden flex h-[65px] w-[200px] pt-1.5 items-center justify-center min-w-fit">
              {/* <img
                src={logo}
                alt="logo"
                height={32}
                width={170}
                className="object-contain object-center"
              /> */}
              <Logo />
            </div>
            {/* Right section with Drawer/Menu */}
            <div className="w-fit lg:w-full h-full">
              <Drawer
                ref={drawerEl}
                muiDrawerProps={{
                  anchor: "right",
                  disableScrollLock: true,
                }}
                menu={
                  <IconButton
                    className=" text-[clamp(20px,4vw,28px)] "
                    sx={{ p: 2 }}
                    onClick={() => drawerEl?.current?.open?.()}
                  >
                    <HiOutlineBars3 className=" text-mw-beige hover:text-mw-green-light" />
                  </IconButton>
                }
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full h-full  lg:mt-0 space-y-6 lg:space-y-0 ">
                  <div className="flex md:flex-1  flex-col lg:flex-row items-center justify-center lg:justify-start space-y-6 lg:space-y-0 lg:space-x-6">
                    {["What's Included", "Stories", "Our Why", "FAQs"].map(
                      (label, i) => {
                        return (
                          <button
                            type="button"
                            key={i}
                            className="leading-none h-full flex items-center justify-center cursor-pointer hover:text-mw-green-light text-center text-white font-normal text-sm"
                          >
                            {label}
                          </button>
                        );
                      }
                    )}
                  </div>
                  {/* Desktop Logo */}
                  <div className="hidden lg:flex h-[65px] relative pt-1.5   items-center justify-center   min-w-fit">
                    <Logo />
                  </div>

                  <div className="flex md:flex-1  flex-col lg:flex-row items-center justify-center lg:justify-end space-y-6 lg:space-y-0 lg:space-x-6">
                    <div className="Login text-white hover:text-mw-green-light cursor-pointer">
                      Login
                    </div>
                    <StartTestingButton />
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        </XSpacing>
      </nav>
    </>
  );
};

export default NavBar;
