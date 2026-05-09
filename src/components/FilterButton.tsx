import { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import { buttons, buttonChild } from "./button";
import { useLocation } from "react-router-dom";
function FilterButton() {
  const tarotContext = useContext(TarotContext);
  const location = useLocation();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-4">
        {buttons.map((item, index) => (
          <button
            key={index}
            className={`rounded-full py-2 px-6 font-semibold text-[16px] transition-all duration-300 ${
              index.toString() === tarotContext?.selectIndexType
                ? "bg-[#a88c26] text-white "
                : "bg-transparent border-2 border-[#a88c26]/50 text-white hover:border-[#a88c26] hover:bg-[#a88c26]/20"
            }`}
            onClick={() => {
              if (tarotContext?.selectIndexType === index.toString()) {
                tarotContext?.setSelectIndexType(undefined);
                tarotContext?.handleFilterType(item.name);
                if (location.pathname === "/tarotdeck") {
                  tarotContext?.fetchCards();
                }
              } else {
                tarotContext?.getIndexType(index.toString());
                tarotContext?.handleFilterType(item.name);
              }
            }}
          >
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {tarotContext?.selectIndexType !== "0" &&
          tarotContext?.selectIndexType !== undefined &&
          buttonChild.map((item, index) => (
            <button
              key={index}
              className={`rounded-full py-2 px-6 font-semibold text-[14px] transition-all duration-300 ${
                index.toString() === tarotContext?.selectIndexSuit
                  ? "bg-[#a88c26] text-white "
                  : "bg-transparent border-2 border-[#a88c26]/50 text-white hover:border-[#a88c26] hover:bg-[#a88c26]/20"
              }`}
              onClick={() => {
                if (tarotContext?.selectIndexSuit === index.toString()) {
                  tarotContext?.setSelectIndexSuit("");
                  tarotContext?.handleFilterType("minor");
                } else {
                  tarotContext?.getIndexSuit(index.toString());
                  tarotContext?.handleFilterSuit(item.name);
                }
              }}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </button>
          ))}
      </div>
      <div className="flex gap-6">
        <button
          className="text-white hover:text-[#a88c26] hover:underline font-medium transition-all duration-300"
          onClick={tarotContext?.sortAZ}
        >
          A-Z
        </button>
        <button
          className="text-white hover:text-[#a88c26] hover:underline font-medium transition-all duration-300"
          onClick={tarotContext?.sortZA}
        >
          Z-A
        </button>
      </div>
    </div>
  );
}

export default FilterButton;
