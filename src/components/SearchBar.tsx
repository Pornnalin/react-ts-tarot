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
        <div className="flex gap-6 justify-center">
          <input
            value={tarotContext?.search}
            onChange={(e) => {
              tarotContext?.setSearch(e.target.value);
              // console.log("input :", e.target.value);
            }}
            type="text"
            placeholder="What’s on your mind?"
            className=" w-[60%] pl-4 rounded-full bg-[#181717] text-left racking-wider text-[16px]"
          />
          <button
            type="submit"
            className="bg-[#A88C26] rounded-lg py-2 px-10  text-xl text-black font-semibold"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex justify-center py-4 gap-4">
        <span className="font-semibold text-[16px]">Popular :</span>
        <span
          className="font-light italic text-[16px] underline cursor-pointer"
          onClick={handleClick}
        >
          Love
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
