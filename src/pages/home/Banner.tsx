import { FaCheck } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import StartTestingButton from "../../components/btns/StartTestingButton";
import { motion, useMotionValue, useSpring } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const scrollerRefEl = useRef<HTMLDivElement>(null);
  const pinRefEl = useRef<HTMLDivElement>(null);
  const fadingEl = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState<number>(0);
  const motionProgress = useMotionValue(0);
  const springX = useSpring(motionProgress, {
    damping: 25,
    stiffness: 120,
    mass: 1,
  });
  useGSAP(
    () => {
      if (
        !scrollerRefEl.current ||
        !pinRefEl.current ||
        !fadingEl ||
        !fadingEl.current
      ) {
        return;
      } else {
        ScrollTrigger.create({
          trigger: scrollerRefEl.current,
          pin: pinRefEl.current,
          // markers: true,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            motionProgress.set(progress);
            setScrollYProgress(progress);
            if (fadingEl.current) {
              fadingEl.current.style.opacity = String(1 - progress);
            }
          },
        });
      }
    },
    {
      dependencies: [scrollerRefEl, pinRefEl, fadingEl, fadingEl],
      scope: "",
    }
  );

  return (
    <div
      ref={pinRefEl}
      className="w-full h-screen min-h-screen bg-white p-3.5 flex relative items-center justify-center"
    >
      <div
        ref={scrollerRefEl}
        className="w-full h-full absolute flex items-end justify-end z-2"
      ></div>
      <div className="w-full h-full relative overflow-hidden flex justify-center rounded-2xl items-center bg-white text-white">
        <div className="w-full h-full absolute inset-0  z-1">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-center object-cover"
          >
            <source
              src="https://superpower-website.b-cdn.net/superpower-100-year-potential-video-hero.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-full h-full flex items-center justify-center relative z-3">
          <div className="absolute bottom-10 md:bottom-14 px-4 md:px-0 left-1/2 -translate-x-1/2 text-white flex flex-col justify-center md:items-center  h-1/2 w-max max-w-full">
            <div
              ref={fadingEl}
              className="flex flex-col w-full gap-3 md:gap-6.5 "
            >
              <p className="md:text-center text-[3.5em] break-words md:text-[4.2rem] leading-none font-medium tracking-tight">
                Every body has <br className="md:inline-flex hidden" /> 100 year
                potential
              </p>
              <p className="text-white md:text-center text-md lg:text-lg font-medium">
                Superpower is your new health intelligence
              </p>
              <div className="md:hidden flex flex-col gap-2">
                <p className="text-white ">
                  <FaCheck className="inline text-xs mr-1"></FaCheck> It starts
                  with 100+ labs
                </p>
                <p className="text-white ">
                  <FaCheck className="inline text-xs mr-1"></FaCheck> A medical
                  team in your pocket
                </p>
                <p className="text-white ">
                  <FaCheck className="inline text-xs mr-1"></FaCheck> A plan
                  that evolves with you
                </p>
              </div>
            </div>
            <StartTestingButton className="py-2.5 px-3.5 mt-6.5 max-w-fit">
              <div className="inline-flex text-xl items-center gap-2 justify-center">
                Start Testing{" "}
                <MdOutlineKeyboardArrowRight className="text-2xl" />
              </div>
            </StartTestingButton>
          </div>
        </div>
        {/* <div className="w-full h-2/3 absolute z-2 bottom-0 left-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div> */}
      </div>
      <div className="absolute left-0 bottom-0 z-20 w-full h-1 ">
        {scrollYProgress <= 0.99 && (
          <motion.div
            style={{ scaleX: springX }}
            className="h-1 bg-mw-green-light z-20  origin-left transform"
          />
        )}
      </div>
    </div>
  );
};

export default Banner;
