import FilterButton from "./FilterButton";
import SearchBar from "./SearchBar";
import ShowTarotCard from "./ShowTarotCard";

function TarotSearch() {
  return (
    <div className="flex flex-col justify-center mt-[100px] mx-20">
      <div className="flex flex-col gap-10">
        <h1 className="text-[50px] text-center font-medium tracking-wide">
          Discover Tarot Cards and Uncover Their Hidden Wisdom
        </h1>
        <h4 className="text-[18px] text-center text-[#BDBDBD]">
          Search the deck, reveal the mysteries of each card, and let their
          guidance illuminate your path
        </h4>
      </div>
      <SearchBar />
      <FilterButton />
      <ShowTarotCard />
    </div>
  );
}

export default TarotSearch;
