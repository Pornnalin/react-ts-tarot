import { useContext, useState } from "react";
import backcard from "../assets/Images/backcard.jpg";
import { TarotContext } from "../context/tarotContext";
import { useNavigate } from "react-router-dom";
import TarotDrawCard from "./TarotDrawCard";
import { BsTranslate } from "react-icons/bs";
import { tarotMeaningsAll } from "../data/tarotMeaningsAll78_complete.ts";

function TarotDrawSection() {
  const tarotContext = useContext(TarotContext);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [isThai, setIsThai] = useState<boolean>(false);

  const navigate = useNavigate();
  const name = tarotContext?.randCardDetail?.name || "";

  const handleClickDetail: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    tarotContext?.setSelectNameCard(name); //อัพเดทข้อมูลตรงนี้
    //สามารถส่งผ่านข้อมูลข้าม pageได้
    navigate(`/detailtarotcard/${name.toLowerCase().trim()}`, {
      state: { setSelectNameCard: name }, //ส่งข้อมูล
    });
  };

  const toggleAnimation = () => {
    if (!isPaused) {
      tarotContext?.handleRandCard();
      setIsButtonDisable(true);
      setIsRevealed(false);

      setTimeout(() => {
        setIsPaused(true);
      }, 400);

      setTimeout(() => {
        setIsRevealed(true);
      }, 1500);

      setTimeout(() => {
        setIsButtonDisable(false);
      }, 1800);
    } else {
      setIsRevealed(false);
      setTimeout(() => {
        setIsPaused(false);
      }, 400);
    }
  };
  const nameKey = name.toLowerCase().trim();
  const cardData = tarotMeaningsAll[nameKey];
  const meaning =
    isThai && cardData?.meaning_up_th
      ? cardData.meaning_up_th
      : tarotContext?.randCardDetail?.meaning_up;
  return (
    <>
      <div className="relative text-center my-[40px] sm:py-[40px] overflow-x-hidden h-full">
        <h3 className="text-xl sm:text-[40px] py-2 px-4 sm:px-0 md:px-10 leading-relaxed text-[#e8e4e4] animate-fadeindown">
          Let the Cards Guide You, Choose One to Reveal Your Path
        </h3>

        {!isPaused ? (
          <div className="w-[200%]">
            <div
              className={`py-7 w-[100%] sliderCard ${
                isPaused ? "animate-fadeout" : ""
              }`}
            >
              <ul className="flex pl-0 m-0">
                {Array.from(Array(8), (_, i) => {
                  return (
                    <li key={i} className="animate-fadeinup" style={{ animationDelay: `${i * 100}ms` }}>
                      <TarotDrawCard
                        isPaused={false}
                        isFlipped={false}
                        backcard={backcard}
                        handleClickDetail={() => console.log("")}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-10 animate-fadeindowncard">
            <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
              <ul className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
                {/* Card */}
                <li className="flex justify-center animate-scalein">
                  <TarotDrawCard
                    isPaused={isPaused}
                    isFlipped={isRevealed}
                    backcard={backcard}
                    handleClickDetail={handleClickDetail}
                  />
                </li>

                {/* Card Details */}
                <li className="flex flex-col gap-6 text-center lg:text-left max-w-md animate-fadeinright">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <h4 className="text-2xl md:text-3xl font-bold text-[#e8e4e4] animate-glow">
                      {tarotContext?.randCardDetail?.name}
                    </h4>
                    <button
                      className="p-2 rounded-lg hover:bg-[#a88c26]/20 hover:scale-110 transition-all duration-300 text-[#a88c26] animate-bounce-slow"
                      onClick={() => {
                        setIsThai((prev) => !prev);
                      }}
                    >
                      <BsTranslate size={20} />
                    </button>
                  </div>

                  <p
                    className={`text-lg md:text-xl text-[#a88c26] font-semibold italic animate-fadein ${
                      isThai ? "text-thai" : ""
                    }`}
                  >
                    {meaning}
                  </p>

                  <div className="flex flex-col gap-2">
                    <p className={`text-sm text-[#94a3b8] animate-pulse ${
                      tarotContext?.isReverse ? "text-red-400" : "text-green-400"
                    }`}>
                      {tarotContext?.isReverse ? "🔮 Card is Reversed" : "✨ Card is Upright"}
                    </p>
                    <p className="text-sm text-[#94a3b8]">Click on the card for more details</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="py-8 flex justify-center">
          <button
            className={`rounded-[20px] bg-gradient-to-r from-[#8b6914] to-[#4a3060] py-3 px-10 text-white font-semibold text-[18px] hover:scale-105 hover:shadow-[0_4px_20px_rgba(168,140,38,0.5)] transition-all duration-300 shadow-[0_4px_15px_rgba(168,140,38,0.3)] animate-bounce-once ${
              isButtonDisable ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              toggleAnimation();
            }}
            disabled={isButtonDisable}
          >
            {isRevealed ? "Draw Another Card" : "Draw Your Fate"}
          </button>
        </div>
      </div>
    </>
  );
}

export default TarotDrawSection;
