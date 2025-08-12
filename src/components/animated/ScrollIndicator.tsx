import {
  motion,
  useScroll,
  useSpring,
  type UseScrollOptions,
} from "motion/react";
const ScrollIndicator = ({ options }: { options?: UseScrollOptions }) => {
  const { scrollYProgress } = useScroll(options);

  const springX = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 1,
  });
  return (
    <div className="flex w-full h-1 bg-transparent">
      <motion.div
        style={{
          scaleX: springX,
        }}
        className="flex w-full origin-left bg-mw-green-light"
      ></motion.div>
    </div>
  );
};

export default ScrollIndicator;
