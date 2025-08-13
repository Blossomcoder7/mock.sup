import { SliderList } from "../../components/options/SliderList";

const Wheel = ({ activeId }: { activeId: string }) => {
  const total = SliderList.length;
  const spikeCount = total * 4;
  const radius = 180;
  const centerX = 200;
  const centerY = 250;
  const labelRadius = radius + 10;

  const activeIndex = SliderList.findIndex(
    (item) => String(item.id) === activeId
  );

  const anglePerItem = (180 / (spikeCount - 1)) * 4;
  const rotationOffset = -(activeIndex * anglePerItem);

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

export default Wheel;
