import React, { useContext } from "react";
import { TarotContext } from "../context/tarotContext";

function SearchBar() {
  const tarotContext = useContext(TarotContext);
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    tarotContext?.fetchSearchResults(tarotContext?.search);
    tarotContext?.setSearch("");
  };
  const handleClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLSpanElement;
    tarotContext?.setSearch(target.innerText);
  };
  return (
    <div className="py-10">
      <form action="" className="" onSubmit={handleOnSubmit}>
        <div className="sm:flex sm:flex-row flex flex-col justify-center items-center gap-6">
          <input
            value={tarotContext?.search}
            onChange={(e) => {
              tarotContext?.setSearch(e.target.value);
              // console.log("input :", e.target.value);
            }}
            type="text"
            placeholder="What’s on your mind?"
            className="w-[100%] sm:w-[60%] text-[16px] py-2 pl-4 rounded-full  border-2 border-transparent bg-[#181717] text-left racking-wider sm:text-[20px]  focus:outline-none focus:border-2 focus:border-[#A88C26]"
          />
          <div className="sm:hidden flex justify-center py-4 gap-4">
            <span className="font-semibold text-[12px] sm:text-[16px]">
              Popular:
            </span>
            <span
              className="font-light italic text-[12px] sm:text-[16px] underline cursor-pointer"
              onClick={handleClick}
            >
              Love
            </span>
            <span
              className="font-light italic text-[12px] sm:text-[16px] underline cursor-pointer"
              onClick={handleClick}
            >
              Money
            </span>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#8b6914] to-[#4a3060] rounded-[20px] py-2 px-10 text-xl text-white font-semibold hover:scale-105 hover:shadow-[0_4px_20px_rgba(168,140,38,0.5)] transition-all duration-300 shadow-[0_4px_15px_rgba(168,140,38,0.3)] animate-bounce-once"
          >
            Search
          </button>
        </div>
      </form>
      <div className="sm:flex hidden justify-center py-4 gap-4">
        <span className="font-semibold text-[12px] sm:text-[16px]">
          Popular:
        </span>
        <span
          className="font-light italic text-[12px] sm:text-[16px] underline cursor-pointer"
          onClick={handleClick}
        >
          Love
        </span>
        <span
          className="font-light italic text-[12px] sm:text-[16px] underline cursor-pointer"
          onClick={handleClick}
        >
          Money
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
