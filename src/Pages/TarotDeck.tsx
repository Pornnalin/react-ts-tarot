import { useContext } from "react";
import FilterButton from "../components/FilterButton";
import Navbar from "../components/Navbar";
import ShowTarotCard from "../components/ShowTarotCard";
import { TarotContext } from "../context/tarotContext";

export default function TarotDeck() {
  const tarotContext = useContext(TarotContext);
  // const [current, setCurrent] = useState<number>(1);
  // const [maxPage, setMaxPage] = useState<number>(0);
  // const [startIndex, setStartIndex] = useState<number>(0);
  // const [endIndex, setEndIndex] = useState<number>(8);

  // function findMaxPage() {
  //   const allCardsLength = tarotContext?.allCard?.length || 0; //  undefined;
  //   const result = Math.ceil(allCardsLength / 8);
  //   setMaxPage(result);
  // }
  // const goToNextPage = () => {
  //   if (current < maxPage) {
  //     setCurrent((pre) => pre + 1);
  //     setStartIndex((prev) => prev + 8);
  //     setEndIndex((prev) => prev + 8);
  //   }
  // };
  // const goToBackPage = () => {
  //   if (current > 1) {
  //     setCurrent((pre) => pre - 1);
  //     setStartIndex((prev) => prev - 8);
  //     setEndIndex((prev) => prev - 8);
  //   }
  // };
  // useEffect(() => {
  //   findMaxPage();
  // }, [tarotContext?.allCard.length]);

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
              className=" w-[60%] py-2 pl-4 rounded-full border-2 border-transparent bg-[#181717] text-left racking-wider text-[20px]  focus:outline-none focus:border-2 focus:border-[#A88C26]"
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
        <ShowTarotCard />
      </div>
    </div>
  );
}
