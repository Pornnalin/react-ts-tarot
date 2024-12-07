import { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import { buttons, buttonChild } from "./button";
function FilterButton() {
  const tarotContext = useContext(TarotContext);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-5">
        {buttons.map((item, index) => (
          <button
            key={index}
            className={
              tarotContext?.activeType
                ? "rounded-[20px] border-[#A88C26] border-[2px] py-2 px-10 text-white font-medium text-[16px]"
                : "rounded-[20px] border-[2px] border-transparent bg-[#A88C26] py-2 px-10 text-black font-medium text-[16px]"
            }
            onClick={() => tarotContext?.handleType(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex gap-5 my-4">
        {buttonChild.map((item, index) => (
          <button
            key={index}
            className={
              tarotContext?.activeSuit
                ? "rounded-[20px] border-[#A88C26] border-[2px] py-2 px-8 text-white font-medium text-[13px]"
                : "rounded-[20px] border-[#A88C26] border-[2px]  bg-[#A88C26] py-2 px-8 text-black font-medium text-[13px]"
            }
            onClick={() => tarotContext?.handleSuit(item.name, index)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <p>A-Z</p>
        <p>Z-A</p>
      </div>
    </div>
  );
}

export default FilterButton;
