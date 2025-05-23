import { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import { buttons, buttonChild } from "./button";
import { useLocation } from "react-router-dom";
function FilterButton() {
  const tarotContext = useContext(TarotContext);
  const location = useLocation();
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-5">
        {buttons.map((item, index) => (
          <button
            key={index}
            className={`rounded-[20px] border-[2px] py-2 px-10 font-medium text-[16px] ${
              index.toString() === tarotContext?.selectIndexType
                ? "border-transparent bg-[#A88C26] text-black"
                : "border-[#A88C26] text-white  "
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
      <div className="flex-row sm:flex gap-5 my-4 ">
        {tarotContext?.selectIndexType !== "0" &&
          tarotContext?.selectIndexType !== undefined &&
          buttonChild.map((item, index) => (
            <button
              key={index}
              className={`rounded-[20px] border-[2px] py-2 px-10 mr-3 mb-3 sm:mb:0 sm:mr:0 font-medium text-[13px]  ${
                index.toString() === tarotContext?.selectIndexSuit
                  ? "border-transparent bg-[#A88C26] text-black"
                  : "border-[#A88C26] text-white "
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
      <div className="flex gap-3">
        <p
          className="hover:underline cursor-pointer"
          onClick={tarotContext?.sortAZ}
        >
          A-Z
        </p>
        <p
          className="hover:underline cursor-pointer"
          onClick={tarotContext?.sortZA}
        >
          Z-A
        </p>
      </div>
    </div>
  );
}

export default FilterButton;
