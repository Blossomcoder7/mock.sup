import clsx from "clsx";
import {
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IconButton, Drawer as MUIDrawer } from "@mui/material";
import { type DrawerProps as MUIDrawerProps } from "@mui/material";
import { IoClose } from "react-icons/io5";
import useSmoothScroll from "../../hooks/animation/useSmoothScroll";


export interface DrawerRefType {
  open: () => void;
  close: () => void;
}
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  muiDrawerProps: Omit<MUIDrawerProps, "open"> | undefined;
  menu: ReactNode | undefined;
}
const Drawer = forwardRef(
  (
    {
      children,
      className,
      onClick,
      menu,
      muiDrawerProps,
      ...rest
    }: DrawerProps,
    ref
  ) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
      onClick?.(e);
    };
    const handleClose = () => {
      setOpenDrawer(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpenDrawer(true);
      },
      close: () => {
        handleClose();
        setOpenDrawer(false);
      },
    }));

    const { changeTarget, retrigger } = useSmoothScroll({});
    const paperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!paperRef?.current) {
        return;
      }
      if (openDrawer) {
        changeTarget(paperRef?.current);
      } else {
        retrigger();
      }
    }, [paperRef, changeTarget, retrigger, openDrawer]);

    return (
      <>
        <div
          {...rest}
          onClick={handleClick}
          className={clsx(
            className,
            `lg:hidden inline-flex items-center justify-center w-fit h-screen max-h-[100svh]`
          )}
        >
          {menu}
        </div>
        <div
          className={clsx(
            `hidden lg:flex flex-row justify-center items-center flex-1 w-full h-full`
          )}
        >
          {children}
        </div>

        <MUIDrawer
          {...muiDrawerProps}
          open={openDrawer}
          onClose={() => handleClose()}
          slotProps={{
            paper: {
              sx: {
                width: 300,
                background: "transparent",
              },
              className: `flex flex-col justify-start items-center space-y-3 bg-transparent relative max-h-[100svh] overflow-hidden`,
            },
          }}
        >
          <IconButton
            sx={{
              p: 0.5,
              color: "white",
              position: "absolute",
              top: 20,
              right: 20,
              "&:hover": {
                color: "red",
              },
            }}
            onClick={() => handleClose()}
          >
            <IoClose className="text-[clamp(20px,2rem,22px)] z-[9999] text-mw-white hover:text-mw-green-light" />
          </IconButton>
          <div
            ref={paperRef}
            className="w-full h-screen max-h-[100svh] overflow-auto flex flex-col py-10 bg-mw-black/60 backdrop-blur-3xl"
          >
            <div className="min-h-fit flex flex-col w-full ">{children}</div>
          </div>
        </MUIDrawer>
      </>
    );
  }
);

Drawer.displayName = "Drawer";
export default Drawer;
