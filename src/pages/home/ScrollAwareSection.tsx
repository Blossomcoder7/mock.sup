/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import XSpacing from "../../components/wrapper/XSpacing";
import Meter from "../../components/elms/Meter";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SliderList } from "../../components/options/SliderList";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import RightArrow from "../../components/elms/RightArrow";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const ScrollAwareSection = () => {
  const pinEl = useRef(null);
  const speedometerRef = useRef<SVGSVGElement | null>(null);

  const motionProg = useMotionValue(0);
  const springX = useSpring(motionProg, {
    damping: 25,
    stiffness: 130,
    mass: 1,
  });
  const meterX = useTransform(springX, [0, 1], ["0%", "100%"]);

  const springY = useSpring(motionProg, {
    damping: 25,
    stiffness: 130,
    mass: 1,
  });
  const itemHeight = 48; // px
  const listLength = SliderList.length;
  const translateY = useTransform(
    springY,
    [0, 1],
    [0, -(itemHeight * (listLength - 1))]
  );

  const generateSpeedometerElements = () => {
    const elements = [];
    const totalDashes = 100;
    const totalDots = 110;
    const centerX = 400;
    const centerY = 400;
    const dashRadius = 380;
    const dotRadius = 340;
    const dashLength = 25;

    for (let i = 0; i < totalDashes; i++) {
      const angle = (i / totalDashes) * 360 - 180; // left
      const radian = (angle * Math.PI) / 180;
      const x = centerX + Math.cos(radian) * dashRadius;
      const y = centerY + Math.sin(radian) * dashRadius;
      elements.push(
        <rect
          key={`dash-${i}`}
          x={x - dashLength / 2}
          y={y - 0.5}
          width={dashLength}
          height="1"
          transform={`rotate(${angle} ${x} ${y})`}
          className="dash"
          data-index={i}
          fill="#cbcbd1"
        />
      );
    }

    for (let i = 0; i < totalDots; i++) {
      const angle = (i / totalDots) * 360 - 180;
      const radian = (angle * Math.PI) / 180;
      const x = centerX + Math.cos(radian) * dotRadius;
      const y = centerY + Math.sin(radian) * dotRadius;

      elements.push(
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r="1.5"
          className="dot"
          data-index={i}
          fill="#cbcbd1"
        />
      );
    }

    return elements;
  };

  useGSAP(
    () => {
      if (!pinEl?.current || !speedometerRef?.current) {
        return;
      } else {
        // Pin the section
        ScrollTrigger.create({
          trigger: pinEl.current,
          //   markers: true,
          pin: pinEl.current,
          start: "top top",
          end: "+=200%",
        });
        if (speedometerRef && speedometerRef.current) {
          const dashes = speedometerRef?.current?.querySelectorAll(".dash");
          const dots = speedometerRef?.current?.querySelectorAll(".dot");
          const dashTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl.current,
              start: "top top",
              end: "+=200%",
              scrub: 1.2,
            },
          });

          // Animate each dash sequentially
          dashes.forEach((dash: any, index: any) => {
            const progress = index / (dashes.length - 1);
            dashTimeline.to(
              dash,
              {
                fill: "#fc5f2b", // Orange color
                duration: 0.1,
                ease: "none",
              },
              progress
            );
          });

          // Create timeline for dot animation
          const dotTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl.current,
              start: "top top",
              end: "+=200%",
              scrub: 1,
            },
          });

          // Animate each dot sequentially with slight delay
          dots.forEach((dot: any, index: any) => {
            const progress = index / (dots.length - 1);
            dotTimeline.to(
              dot,
              {
                fill: "#fc5f2b", // Orange color
                duration: 0.1,
                ease: "none",
              },
              progress * 0.8
            ); // Slight offset from dashes
          });

          ScrollTrigger.create({
            trigger: pinEl.current,
            start: "top top",
            end: "+=200%",
            onUpdate: (self) => {
              const progress = self.progress;
              motionProg.set(progress);

              const activeDashIndex = Math.floor(progress * dashes.length);
              const activeDotIndex = Math.floor(progress * dots.length * 0.8);
              dashes.forEach((dash: any) => dash.classList.remove("pulse"));
              dots.forEach((dot: any) => dot.classList.remove("pulse"));
              if (dashes[activeDashIndex]) {
                dashes[activeDashIndex].classList.add("pulse");
              }
              if (dots[activeDotIndex]) {
                dots[activeDotIndex].classList.add("pulse");
              }
            },
          });
        }
      }
    },
    { scope: undefined, dependencies: [pinEl] }
  );

  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>("1");

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || !containerRef.current) return;
      const items = Array.from(listRef.current.children) as HTMLElement[];
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenterY = containerRect.top + containerRect.height / 2;
      let closestItem: HTMLElement | null = null;
      let closestDistance = Infinity;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(containerCenterY - itemCenterY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
        }
      });

      if (closestItem) {
        const id = (closestItem as HTMLDivElement).getAttribute("data-id");
        if (id) setActiveId(id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeSlide = SliderList?.find((a) => String(a?.id) === activeId);

  return (
    <>
      <div
        ref={pinEl}
        className="w-full min-h-fit h-screen bg-white flex items-start relative justify-center py-9 mt-3"
      >
        <XSpacing>
          <div className="w-full h-screen min-h-fit bg-white flex relative items-center justify-center">
            <div className="w-full h-full  relative z-2 flex items-center justify-center">
              {/* svg speedometer el  */}
              <svg
                ref={speedometerRef}
                width="90%"
                height="90%"
                viewBox="0 0 800 800"
                className="w-full max-w-3xl h-auto"
              >
                {generateSpeedometerElements()}
              </svg>
              {/* center text  */}
              <div className=" absolute top-[40%] left-1/2 inset-0 -translate-1/2 flex flex-col items-center justify-center z-3">
                <p className="text-black font-normal text-[2rem] lg:text-[4rem] text-center leading-tight tracking-tight">
                  It starts with <br />
                  100+ labs
                </p>
                <p className=" text-black/60 font-normal text-sm text-center lg:text-[1.4rem] leading-normal">
                  From heart health to hormone balance we <br /> detect early
                  signs of over 1,000 conditions
                </p>
              </div>
              {/* bottom meter  */}
              <div className="w-full h-[40%] min-h-fit absolute bottom-0 z-3 inset-x-0 bg-gradient-to-t  from-white  via-white/80 to-white/0 flex items-start justify-center">
                <div className="w-xs h-fit flex flex-col gap-0.5">
                  <div className="w-full h-1/4 py-2.5 rounded-t-3xl bg-[#f5f5f5] gap-2 flex items-center justify-center">
                    <div className="flex items-center justify-center overflow-hidden bg-black rounded-[0.6rem] aspect-square h-[2rem]">
                      <img
                        src={activeSlide?.image}
                        alt="image"
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <span>{activeSlide?.title}</span>
                  </div>
                  <div className="w-full p-3 min-h-32 gap-4 flex-1 flex flex-col rounded-b-3xl bg-[#f5f5f5]  items-center justify-center">
                    <p className="font-medium text-xs text-[#71717a] w-full">
                      {activeSlide?.des}
                    </p>
                    <div className="w-fit mx-auto px-6 py-3 bg-white rounded-3xl text-sm">
                      Everything we test{" "}
                      <MdOutlineKeyboardArrowRight className="inline ml-1" />
                    </div>
                  </div>
                  <div className="w-full  py-3 h-1/6  mt-0.5 rounded-3xl bg-[#f5f5f5] px-5 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      <motion.div
                        style={{
                          left: meterX,
                        }}
                        className="w-[1px] bg-mw-green-light h-[16px] absolute "
                      ></motion.div>
                      <Meter />
                    </div>
                  </div>
                </div>
              </div>
              {/* left side meter el  */}
              <div className="w-sm h-42 absolute z-3 left-0 top-1/2 -translate-y-1/2  overflow-hidden hidden lg:block  ">
                {/* grads  */}
                <div className="absolute inset-x-0 top-0 left-0 w-full h-1/3 z-4 pointer-events-auto bg-gradient-to-b from-white to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 left-0 w-full h-1/3 z-4 pointer-events-auto bg-gradient-to-t from-white to-transparent"></div>
                {/* content  */}
                <div
                  ref={containerRef}
                  className="w-full  flex  h-12  absolute left-0 top-1/2 -translate-y-1/2 px-4"
                >
                  <div className="absolute ps-4 left-0 top-1/2 -translate-y-1/2">
                    <RightArrow />
                  </div>
                  <motion.div
                    style={{ y: translateY }}
                    ref={listRef}
                    className="flex flex-col w-full  items-center h-auto text-black"
                  >
                    {SliderList.map((a, i) => {
                      return (
                        <motion.div
                          key={`sliding-list-item-${i}`}
                          data-id={a.id}
                          className={clsx(
                            "w-full h-12 flex justify-start gap-3 items-center"
                          )}
                          animate={{
                            paddingLeft: activeId === String(a.id) ? 20 : 60,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                          }}
                        >
                          <div className="w-full h-full py-2.5 rounded-t-3xl  gap-4 flex items-center justify-start">
                            <div className="flex items-center justify-center overflow-hidden  rounded-[0.6rem] aspect-square w-[2rem] h-[2rem]">
                              <img
                                src={a?.image}
                                alt="image"
                                className="object-cover object-center h-full w-full "
                              />
                            </div>
                            <span className="">{a?.title}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </XSpacing>
      </div>
    </>
  );
};

export default ScrollAwareSection;
