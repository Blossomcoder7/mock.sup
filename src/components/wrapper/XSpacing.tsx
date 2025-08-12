import clsx from "clsx";
import React, { type ReactNode } from "react";

interface XSpacing
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className"> {
  children: ReactNode;
  className?: string;
}
const XSpacing: React.FC<XSpacing> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        `flex flex-col justify-center items-center w-full h-fit px-[7px] md:px-[8px] lg:px-[10px] xl:px-[20px] 2xl:max-w-[160rem] 2xl:mx-auto`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default XSpacing;
