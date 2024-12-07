import FilterButton from "../components/FilterButton";
import Navbar from "../components/Navbar";
import ShowTarotCard from "../components/ShowTarotCard";

export default function TarotDeck() {
  return (
    <div className="max-mx-auto px-[70px] ">
      <Navbar />
      <div className="mx-20">
        <form action="" className="pt-10 pb-5">
          <div className="flex gap-6 justify-start">
            <input
              type="text"
              placeholder="Search by card or meaning..."
              className=" w-[60%] py-2 pl-4 rounded-full bg-[#181717] text-left racking-wider text-[20px]"
            />
          </div>
        </form>
        <FilterButton />
        <ShowTarotCard />
        <div className="py-10 text-xl flex justify-center gap-10">
          <button>Prev</button>
          <span>2 of 10</span>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}
