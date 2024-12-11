import { useContext, useEffect, useState } from "react";
import FilterButton from "../components/FilterButton";
import Navbar from "../components/Navbar";
import ShowTarotCard from "../components/ShowTarotCard";
import { TarotContext } from "../context/tarotContext";

export default function TarotDeck() {
  const tarotContext = useContext(TarotContext);
  const [current, setCurrent] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [firstNum, setFirstNum] = useState<number>(0);
  const [secNum, setSecNum] = useState<number>(8);

  function findMaxPage() {
    const allCardsLength = tarotContext?.allCard?.length || 0; //  undefined;
    const result = Math.ceil(allCardsLength / 8);
    setMaxPage(result);
  }
  const goToNextPage = () => {
    // const nextPageStartIndex = firstNum;
    // const nextPageEndIndex = firstNum + 8;
    if (current < maxPage) {
      setCurrent((pre) => pre + 1);
      setFirstNum((prev) => prev + 8);
      setSecNum((prev) => prev + 8);
    }
  };
  const goToBackPage = () => {
    const backPageStartIndex = firstNum - 8;
    const backPageEndIndex = secNum - 8;
    if (current > 1) {
      setCurrent((pre) => pre - 1);
      setFirstNum(backPageStartIndex);
      setSecNum(backPageEndIndex);
    }
  };
  useEffect(() => {
    findMaxPage();
  }, [tarotContext?.allCard.length]);

  return (
    <div className="max-mx-auto px-[70px] ">
      <Navbar />
      <div className="mx-20">
        <form action="" className="pt-10 pb-5">
          <div className="flex gap-6 justify-start">
            <input
              type="text"
              value={tarotContext?.searchDeckPage}
              placeholder="Search by card or meaning..."
              className=" w-[60%] py-2 pl-4 rounded-full bg-[#181717] text-left racking-wider text-[20px]"
              onChange={(e) => {
                tarotContext?.setSearchDeckPage(e.target.value);
                tarotContext?.searchInDeckPage(e.target.value);
              }}
            />
          </div>
        </form>
        <FilterButton />
        <div>
          {tarotContext?.allCard && tarotContext?.allCard.length > 8 ? (
            <div className="py-3 text-md flex justify-end gap-4">
              <button
                className={`${
                  current === 1 ? "cursor-default text-gray-600" : ""
                }`}
                onClick={goToBackPage}
              >
                Prev
              </button>
              <span className="w-[100px] block text-center">
                {current} of {maxPage}
              </span>
              <button
                className={`${
                  current === maxPage ? "cursor-default  text-gray-600" : ""
                }`}
                onClick={goToNextPage}
              >
                Next
              </button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <ShowTarotCard first={firstNum} sec={secNum} />
      </div>
    </div>
  );
}
