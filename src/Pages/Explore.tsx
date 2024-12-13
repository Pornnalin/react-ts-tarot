import TarotDrawSection from "../components/TarotDrawSection";
import TarotSearch from "../components/TarotSearch";
import Navbar from "../components/Navbar";

export default function Explore() {
  return (
    <div>
      <div className="max-mx-auto sm:px-[70px] px-[30px]">
        <Navbar />
        <div className="animate-fadeindown">
          <TarotSearch />
        </div>
      </div>
      <div className="animate-fadein">
        <TarotDrawSection />
      </div>
    </div>
  );
}
