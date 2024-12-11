import TarotDrawSection from "../components/TarotDrawSection";
import TarotSearch from "../components/TarotSearch";
import Navbar from "../components/Navbar";

export default function Explore() {
  return (
    <div>
      <div className="max-mx-auto px-[70px] ">
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
