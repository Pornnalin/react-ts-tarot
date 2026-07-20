import Navbar from "../components/Navbar";
import TarotDrawSection from "../components/TarotDrawSection";
import { useSeo } from "../hooks/useSeo";

export default function TarotDraw() {
  useSeo(
    "Draw a Tarot Card - Free Online Reading | Tarot Whisper",
    "Draw a random tarot card online for free and reveal its meaning and guidance for your day.",
    "/tarotdraw"
  );
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
