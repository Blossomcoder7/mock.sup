import clsx from "clsx";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";

const StartTestingButton = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const controls = useAnimation();

  return (
    <motion.div
      onMouseEnter={() => {
        controls.start({
          boxShadow: "0 0 10px 2px rgba(255,165,0,0.6)",
          transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
        });
      }}
      onMouseLeave={() => {
        controls.start({
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          transition: { duration: 0.3, ease: "easeIn" },
        });
      }}
      animate={controls}
      className={clsx(
        "flex font-medium text-sm lg:text-sm bg-mw-green-light hover:bg-[#ff8600] text-white px-6 py-2 rounded-full cursor-pointer border-2 border-transparent ",
        className
      )}
    >
      <div {...rest} className="w-full h-full">
        {children ?? "Start Testing"}
      </div>
    </motion.div>
  );
};

export default StartTestingButton;
