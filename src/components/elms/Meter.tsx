import { Fragment } from "react";

const Meter = () => {
  const groupCount = 14;
  const ticksPerGroup = 7;

  const genGroup = (groupIndex: number) => {
    return (
      <div key={groupIndex} className="flex items-center gap-[4px]">
        {Array.from({ length: ticksPerGroup }).map((_, tickIndex) => {
          const isMainTick = tickIndex === 0 || tickIndex === ticksPerGroup - 1;
          return (
            <div
              key={tickIndex}
              className={`w-[1px]  ${
                isMainTick ? "h-[16px] bg-gray-400/60" : "h-[16px] bg-gray-200"
              }`}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex items-center overflow-hidden flex-nowrap">
      {Array.from({ length: groupCount }).map((_, groupIndex) => (
        <Fragment key={groupIndex}>{genGroup(groupIndex)}</Fragment>
      ))}
    </div>
  );
};

export default Meter;
