import Navbar from "../components/Navbar";
import TarotDrawSection from "../components/TarotDrawSection";

export default function TarotDraw() {
  return (
    <div className="">
      <div className="max-mx-auto sm:px-[70px] px-[30px] ">
        <Navbar />
      </div>
      <div className="animate-fadein ">
        <TarotDrawSection />
      </div>
    </div>
  );
}
