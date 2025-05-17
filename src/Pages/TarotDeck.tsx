import { useContext, useEffect } from "react";
import FilterButton from "../components/FilterButton";
import Navbar from "../components/Navbar";
import ShowTarotCard from "../components/ShowTarotCard";
import { TarotContext } from "../context/tarotContext";

export default function TarotDeck() {
  const tarotContext = useContext(TarotContext);
  useEffect(() => {
    tarotContext?.fetchCards();
  }, []);

  return (
    <div className="max-mx-auto sm:px-[70px] px-[30px] md:px-[50px]  ">
      <Navbar />
      <div className="sm:mx-20 md:mx-0">
        <form action="" className="pt-10 pb-5 animate-fadeindown">
          <div className="flex gap-6 justify-start">
            <input
              type="text"
              value={tarotContext?.searchDeckPage}
              placeholder="Search by card or meaning..."
              className="md:w-[60%] w-[100%] py-2 pl-4 rounded-full border-2 border-transparent bg-[#181717] text-left racking-wider text-[20px]  focus:outline-none focus:border-2 focus:border-[#A88C26]"
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
            <div className="py-3 text-md flex justify-end gap-4 animate-fadeindown">
              <button
                className={`${
                  tarotContext.current === 1
                    ? "cursor-default text-gray-600"
                    : ""
                }`}
                onClick={tarotContext.goToBackPage}
              >
                Prev
              </button>
              <span className="w-[100px] block text-center">
                {tarotContext.current} of {tarotContext.maxPage}
              </span>
              <button
                className={`${
                  tarotContext.current === tarotContext.maxPage
                    ? "cursor-default  text-gray-600"
                    : ""
                }`}
                onClick={tarotContext.goToNextPage}
              >
                Next
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
