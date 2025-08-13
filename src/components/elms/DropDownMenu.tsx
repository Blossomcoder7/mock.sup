import { useState } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import whatsIncludedAnim from "../../assets/json/menu-test-tube.json";
import storiesAnim from "../../assets/json/menu-review.json";
import image3 from "../../assets/image/newImage1.png";
import image4 from "../../assets/image/newImage2.png";
import { IoIosArrowForward } from "react-icons/io";
import Lottie from "lottie-react";

const DropDownMenu = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      animation: whatsIncludedAnim,
      title: "What's Included",
      description:
        "Your membership starts with 100+ labs. Here's everything we test.",
    },
    {
      id: 2,
      animation: storiesAnim,
      title: "Stories",
      description:
        "Hear what members have to say about their Superpower experience.",
    },
    {
      id: 3,
      image: image3,
      title: "Our why",
      description: "Our vision for a better future of health.",
    },
    {
      id: 4,
      image: image4,
      title: "FAQs",
      description: "Find answers to common questions.",
    },
  ];

  const topLinks = [
    { text: "World's Healthiest", icon: true },
    { text: "The Founder Health Coalition", icon: true },
  ];

  const bottomLinks = [
    { text: "Privacy Policy", icon: false },
    { text: "Informed Medical Consent", icon: false },
    { text: "Terms & Conditions", icon: false },
  ];

  return (
    <div className="w-full h-full min-h-fit flex justify-center items-center">
      <div className="w-full min-h-fit mx-auto px-8 py-7 font-sans bg-white rounded-4xl">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
        </div>

        {/* first part  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-7">
          {items.map((item) => {
            const isDimmed = hoveredId !== null && hoveredId !== item.id;
            return (
              <div
                key={item.id}
                className={`group cursor-pointer transition-opacity duration-300 ${
                  isDimmed ? "opacity-50" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="w-full h-[150px] border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                    {item.animation ? (
                      <Lottie
                        animationData={item.animation}
                        loop={true}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all hover:scale-105 ease-in-out duration-150"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 flex gap-1 items-center transition-colors">
                      {item.title}{" "}
                      <span className="flex justify-center items-center">
                        <IoIosArrowForward />
                      </span>
                    </h2>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-px bg-gray-200 my-4"></div>

        {/* second part */}
        <div className="flex flex-col md:flex-row justify-between text-sm pb-8 text-gray-500">
          <div className="flex gap-6 items-center mb-4 md:mb-5">
            {topLinks.map((link, index) => (
              <p
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex gap-2 items-center cursor-pointer transition-all duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "opacity-50"
                    : "opacity-100"
                }`}
              >
                {link.text}
                {link.icon && (
                  <span className="text-lg">
                    <RiExternalLinkLine />
                  </span>
                )}
              </p>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:gap-6">
            {bottomLinks.map((link, index) => {
              const idx = topLinks.length + index;
              return (
                <p
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredIndex !== null && hoveredIndex !== idx
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  {link.text}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
