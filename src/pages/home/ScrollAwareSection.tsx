/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import XSpacing from "../../components/wrapper/XSpacing";

gsap.registerPlugin(ScrollTrigger);

const ScrollAwareSection = () => {
  const pinEl = useRef(null);
  const speedometerRef = useRef<SVGSVGElement | null>(null);

  // Generate speedometer elements
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
      const angle = (i / totalDashes) * 360 - 180; // Start from top
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
      const angle = (i / totalDots) * 360 - 180; // Start from top
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
              scrub: 1, // Smooth scrubbing
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

  return (
    <>
      <div
        ref={pinEl}
        className="w-full min-h-fit h-screen bg-white flex items-start relative justify-center py-9 mt-3"
      >
        <XSpacing>
          <div className="w-full h-screen min-h-fit bg-white flex relative items-center justify-center">
            {/* Background layers */}
            <div className="w-full h-full inset-0 top-0 left-0  absolute z-1"></div>

            {/* Speedometer SVG */}
            <div className="w-full h-full  relative z-2 flex items-center justify-center">
              <svg
                ref={speedometerRef}
                width="90%"
                height="90%"
                viewBox="0 0 800 800"
                className="w-full max-w-3xl h-auto"
              >
                {generateSpeedometerElements()}
              </svg>
              <div className=" absolute top-1/2 left-1/2 inset-0 -translate-1/2 flex flex-col items-center justify-center z-3">
                <p className="text-black font-normal text-[2rem] lg:text-[4rem] text-center leading-tight tracking-tight">
                  It starts with <br />
                  100+ labs
                </p>
                <p className=" text-black/60 font-normal text-sm text-center lg:text-[1.4rem] leading-normal">
                  From heart health to hormone balance we <br /> detect early
                  signs of over 1,000 conditions
                </p>
              </div>
            </div>
          </div>
        </XSpacing>
      </div>
    </>
  );
};

export default ScrollAwareSection;
