import { useContext, useEffect } from "react";
import FilterButton from "../components/FilterButton";
import Navbar from "../components/Navbar";
import ShowTarotCard from "../components/ShowTarotCard";
import { TarotContext } from "../context/tarotContext";

export default function TarotDeck() {
  const tarotContext = useContext(TarotContext);
  useEffect(() => {
    tarotContext?.fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <form action="" className="pt-8 pb-6 animate-fadeindown">
          <div className="flex gap-4 justify-start">
            <input
              type="text"
              value={tarotContext?.searchDeckPage}
              placeholder="Search by card or meaning..."
              className="md:w-[60%] w-full py-3 px-5 rounded-full border-2 border-[#a88c26]/30 bg-[#181717]/80 backdrop-blur-sm text-left text-[16px] text-[#e8e4e4] focus:outline-none focus:border-[#a88c26] focus:shadow-[0_0_20px_-5px_rgba(168,140,38,0.3)] transition-all duration-300"
              onChange={(e) => {
                tarotContext?.setSearchDeckPage(e.target.value);
                tarotContext?.searchInDeckPage(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="animate-fadeindown">
          <FilterButton />
        </div>
        <div>
          {tarotContext?.allCard && tarotContext?.allCard.length > 8 ? (
            <div className="py-4 flex justify-end gap-6 items-center animate-fadeindown">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  tarotContext.current === 1
                    ? "cursor-default text-gray-600 bg-gray-800/50"
                    : "bg-gradient-to-r from-[#8b6914] to-[#4a3060] text-white hover:scale-105 hover:shadow-[0_4px_20px_rgba(168,140,38,0.5)] shadow-[0_4px_15px_rgba(168,140,38,0.3)] animate-bounce-once"
                }`}
                onClick={tarotContext.goToBackPage}
              >
                ← Prev
              </button>
              <span className="text-sm font-medium text-[#e8e4e4] min-w-[80px] text-center">
                {tarotContext.current} / {tarotContext.maxPage}
              </span>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  tarotContext.current === tarotContext.maxPage
                    ? "cursor-default text-gray-600 bg-gray-800/50"
                    : "bg-gradient-to-r from-[#8b6914] to-[#4a3060] text-white hover:scale-105 hover:shadow-[0_4px_20px_rgba(168,140,38,0.5)] shadow-[0_4px_15px_rgba(168,140,38,0.3)] animate-bounce-once"
                }`}
                onClick={tarotContext.goToNextPage}
              >
                Next →
              </button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <ShowTarotCard key={tarotContext?.current} />
      </div>
    </div>
  );
}
