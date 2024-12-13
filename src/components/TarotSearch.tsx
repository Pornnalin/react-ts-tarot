import { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import FilterButton from "./FilterButton";
import SearchBar from "./SearchBar";
import ShowTarotCard from "./ShowTarotCard";

function TarotSearch() {
  const tarotContext = useContext(TarotContext);

  return (
    <div className="flex flex-col justify-center mt-[40px] md:mt-[100px] sm:mx-20">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl tracking-normal md:text-[50px] md:tracking-wide text-center font-medium leading-relaxed">
          Discover Tarot Cards and Uncover Their Hidden Wisdom
        </h1>

        <h4 className="text-[14px] md:text-[18px] text-center text-[#BDBDBD]">
          Search the deck, reveal the mysteries of each card, and let their
          guidance illuminate your path
        </h4>
      </div>
      <SearchBar />
      {tarotContext?.cardList.length ? (
        <>
          <FilterButton />
          <ShowTarotCard />
        </>
      ) : (
        <div className="items-center text-center"></div>
      )}
    </div>
  );
}

export default TarotSearch;
