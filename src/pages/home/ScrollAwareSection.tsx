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

      // Use rotation-aware or fallback
      if (window.innerWidth >= 768) {
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
      } else {
        // For small screens, use scrollTop / simple index
        const progress = motionProg.get(); // already 0-1
        const index = Math.round(progress * (SliderList.length - 1));
        setActiveId(String(SliderList[index].id));
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
        className="w-full min-h-fit h-screen bg-white flex items-start relative justify-center sm:py-9 mt-3"
      >
        <XSpacing>
          <div className="w-full h-screen min-h-fit bg-white flex relative items-center justify-center">
            <div className="w-full h-full   relative z-2 flex items-center justify-center">
              {/* svg speedometer el  */}
              <svg
                ref={speedometerRef}
                width="90%"
                height="90%"
                viewBox="0 0 800 800"
                className="w-full max-w-3xl h-auto "
              >
                {generateSpeedometerElements()}
              </svg>
              {/* center text  */}
              <div className=" absolute top-[45%] sm:top-[40%] left-1/2 inset-0 -translate-1/2 flex flex-col items-center justify-center z-3">
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
              <div className="w-sm h-72 md:h-42 hidden md:block absolute z-3 left-1/2 md:left-0 top-0 md:top-1/2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2  overflow-hidden  ">
                {/* grads  */}
                <div className="absolute  hidden md:block inset-x-0 top-0 left-0 w-full h-1/3 z-4 pointer-events-auto bg-gradient-to-b from-white to-transparent"></div>
                <div className="absolute hidden md:block  inset-x-0 bottom-0 left-0 w-full h-1/3 z-4 pointer-events-auto bg-gradient-to-t from-white to-transparent"></div>
                {/* content  */}
                <div
                  ref={containerRef}
                  style={{ perspective: 800 }}
                  className="w-full  flex  h-12  absolute left-0 top-1/2 -translate-y-1/2 px-4"
                >
                  <div className="absolute  ps-4 left-0 top-1/2 -translate-y-1/2">
                    <span className="hidden md:block ">
                      <RightArrow />
                    </span>
                  </div>

                  <motion.div
                    style={{
                      y: translateY,
                      transformStyle: "preserve-3d", // allow 3D transforms on children
                    }}
                    ref={listRef}
                    className="flex flex-col w-full  items-center h-auto text-black"
                  >
                    {SliderList.map((a, i) => {
                      return (
                        <motion.div
                          key={`sliding-list-item-${i}`}
                          data-id={a.id}
                          className={clsx(
                            "w-full h-12 flex justify-start gap-3 items-center",
                            window.innerWidth > 768
                              ? "opacity-100"
                              : activeId === String(a.id)
                              ? "opacity-100"
                              : "opacity-40"
                          )}
                          animate={{
                            paddingLeft:
                              window.innerWidth < 768
                                ? 0
                                : activeId === String(a.id)
                                ? 20
                                : 60,
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
                                className="object-cover object-center h-full w-full hidden sm:block "
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
              <div className="w-full  h-72  block md:hidden absolute z-0 top-0 left-0  overflow-hidden  ">
                <Wheel activeId={activeId || ""} />
              </div>
            </div>
          </div>
        </XSpacing>
      </div>
    </>
  );
};

export default ScrollAwareSection;

const Wheel = ({ activeId }: { activeId: string }) => {
  const total = SliderList.length;
  const spikeCount = total * 4;
  const radius =180;
  const centerX = 200;
  const centerY = 250;
  const labelRadius = radius + 10;

  const activeIndex = SliderList.findIndex(
    (item) => String(item.id) === activeId
  );

  // Angle offset so active item is at the top
  const anglePerItem = (180 / (spikeCount - 1)) * 4; // spacing between titles
  const rotationOffset = -(
    (activeIndex * anglePerItem ) // 90° = top center in our arc
  );

  return (
    <div className="relative w-full flex  md:hidden">
      <svg width="400" height="400" viewBox="0 0 400 200">
        <g transform={`rotate(${rotationOffset}, ${centerX}, ${centerY})`}>
          {SliderList.map((item, i) => {
            const spikeIndex = i * 4;
            const angle = (spikeIndex / (spikeCount - 1)) * 180 - 90;
            const rad = (angle * Math.PI) / 180;
            const x = centerX + (labelRadius + 10) * Math.cos(rad);
            const y = centerY + (labelRadius + 10) * Math.sin(rad);
            return (
              <text
                key={item.id}
                x={x}
                y={y}
                fontSize="14"
                fill={String(item.id) === activeId ? "#000" : "#999"}
                transform={`rotate(${angle}, ${x}, ${y})`}
                textAnchor="start"
                dominantBaseline="middle"
              >
                {item.title}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
