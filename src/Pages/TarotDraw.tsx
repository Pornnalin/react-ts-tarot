import Navbar from "../components/Navbar";
import TarotDrawSection from "../components/TarotDrawSection";

export default function TarotDraw() {
  return (
    <>
      <div className="max-mx-auto px-[70px]">
        <Navbar />
      </div>
      <div>
        <TarotDrawSection />
      </div>
    </>
  );
}
