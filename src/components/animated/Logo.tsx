import clsx from "clsx";
import type React from "react";
import { type HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
}
const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "w-full  h-full flex items-center justify-center",
        className
      )}
    >
      <div className="flex w-full h-full gap-2.5 flex-nowrap  items-center justify-center relative">
        <img
          src="https://cdn.prod.website-files.com/63792ff4f3d6aa3d62071b61/68756d60749a9d4add4303c6_superpower-logo.svg"
          alt="logo"
          className=" h-[1.5rem] object-contain w-full"
        />
      </div>
    </div>
  );
};

export default Logo;
