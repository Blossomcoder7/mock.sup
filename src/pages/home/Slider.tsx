import { useState } from "react";

import image1 from "../../assets/image/img1.png";
import image2 from "../../assets/image/img2.png";
import image3 from "../../assets/image/img3.png";
import image4 from "../../assets/image/img4.png";
import image5 from "../../assets/image/img5.png";
import image6 from "../../assets/image/img6.png";
import image7 from "../../assets/image/img7.png";
import image8 from "../../assets/image/img8.png";
import image9 from "../../assets/image/img9.png";
import image10 from "../../assets/image/img10.png";

import logo1 from "../../assets/logo/logo1.avif";
import logo2 from "../../assets/logo/logo2.avif";
import logo3 from "../../assets/logo/logo3.avif";
import logo4 from "../../assets/logo/logo4.avif";
import logo5 from "../../assets/logo/logo5.avif";
import logo6 from "../../assets/logo/logo6.avif";
import logo7 from "../../assets/logo/logo7.avif";
import logo8 from "../../assets/logo/logo8.avif";
import logo9 from "../../assets/logo/logo9.avif";
import logo10 from "../../assets/logo/logo10.avif";

const leftItems = [
  { img: image1, text: "Cancer screening" },
  { img: image2, text: "Body composition" },
  { img: image3, text: "Immunity boost" },
  { img: image4, text: "Gut health" },
  { img: image5, text: "Cognition care" },
  { img: image6, text: "Heart health" },
  { img: image7, text: "Male hormones" },
  { img: image8, text: "Female hormones" },
  { img: image9, text: "Aging & longevity" },
  { img: image10, text: "Toxin testing" },
];

const rightImages = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
];

const Slider = () => {
  const [hoverIndex, setHoverIndex] = useState(0);

  return (
    <>
      <div className="py-10 mx-auto max-w-6xl flex flex-col">
        <div className="flex w-full justify-start md:justify-center items-start md:items-center text-start md:text-center">
          <div className="tracking-[-0.02em] text-3xl md:text-4xl lg:text-[3rem] leading-[1.125] font-medium">
            <div className="hidden md:block">
              <p>
                Your symptoms are signals <br />
                We decode them with you
              </p>
            </div>
            <div className="block md:hidden px-6">
              <p>
                Your symptoms are <br /> signals <br />
                We decode them with <br /> you
              </p>
            </div>
          </div>
        </div>

        <div className="w-full  h-auto py-10 px-6 flex flex-col gap-8 lg:gap-0 lg:flex-row ">
          {/* Left side */}
          <div className="tracking-[-0.02em] text-xl md:text-2xl lg:text-[3.2rem] leading-[1.125] flex flex-col gap-1.5 w-full lg:w-1/2">
            {leftItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center cursor-pointer"
                onMouseEnter={() => setHoverIndex(index)}
              >
                <div className="flex items-center text-gray-400">
                  <div
                    className={`h-[1px] bg-current transition-all duration-300 mr-2 ${
                      hoverIndex === index
                        ? "w-[14px] bg-red-500"
                        : "w-1 bg-gray-400"
                    }`}
                  ></div>
                  <img
                    src={item.img}
                    alt={item.text}
                    className={`lg:w-full lg:h-full object-contain lg:rounded-2xl rounded-full w-9 h-9 transition-all scale-95 duration-300 ${
                      hoverIndex === index
                        ? "opacity-100 max-w-[4rem] mr-2"
                        : "opacity-0 max-w-0 mr-0"
                    }`}
                  />
                  <p
                    className={
                      hoverIndex === index
                        ? "font-medium text-black w-full"
                        : "text-gray-400 opacity-40"
                    }
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Right side */}
          <div className="w-full lg:w-1/2 flex flex-1 items-center justify-center relative ">
            <img
              src={rightImages[hoverIndex]}
              alt="Selected"
              className="w-full h-full transition-all ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
