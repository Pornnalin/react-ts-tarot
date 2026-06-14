import { useContext, useState } from "react";
import backcard from "../assets/Images/backcard.jpg";
import { TarotContext } from "../context/tarotContext";
import { useNavigate } from "react-router-dom";
import TarotDrawCard from "./TarotDrawCard";
import { BsTranslate } from "react-icons/bs";
import { tarotMeaningsAll } from "../data/tarotMeaningsAll78_complete.ts";
import { getTarotMeaningKey, toTarotSlug } from "../utils/tarotNaming";

function TarotDrawSection() {
  const tarotContext = useContext(TarotContext);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [isThai, setIsThai] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  const navigate = useNavigate();
  const name = tarotContext?.randCardDetail?.name || "";

  const handleClickDetail: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    tarotContext?.setSelectNameCard(name); //อัพเดทข้อมูลตรงนี้
    //สามารถส่งผ่านข้อมูลข้าม pageได้
    navigate(`/detailtarotcard/${toTarotSlug(name)}`, {
      state: { setSelectNameCard: name }, //ส่งข้อมูล
    });
  };

  const toggleAnimation = () => {
    if (!isPaused) {
      setIsShuffling(true);
      tarotContext?.handleRandCard();
      setIsButtonDisable(true);
      setIsRevealed(false);

      setTimeout(() => {
        setIsPaused(true);
        setIsShuffling(false);
      }, 400);

      setTimeout(() => {
        setIsRevealed(true);
      }, 1300); // Slight delay for smoother flip

      setTimeout(() => {
        setIsButtonDisable(false);
      }, 2100); // Allow flip animation to complete smoothly
    } else {
      setIsRevealed(false);
      setTimeout(() => {
        setIsPaused(false);
      }, 900); // Allow flip back animation to complete (0.8s + buffer)
    }
  };
  const nameKey = getTarotMeaningKey(name);
  const cardData = tarotMeaningsAll[nameKey];
  const meaning =
    isThai && cardData?.meaning_up_th
      ? cardData.meaning_up_th
      : tarotContext?.randCardDetail?.meaning_up;
  return (
    <>
      <div className="relative text-center my-[40px] sm:py-[40px] overflow-x-hidden h-full">
        <h3 className="text-xl sm:text-[40px] py-2 px-4 sm:px-0 md:px-10 leading-relaxed text-white animate-fadeindown">
          Let the Cards Guide You, Choose One to Reveal Your Path
        </h3>

        {!isPaused ? (
          <div
            className={`overflow-hidden transition-opacity duration-300 ${
              isPaused ? "opacity-0" : "opacity-100"
            }`}
          >
            <ul className={`sliderCard flex w-max flex-nowrap items-center gap-4 sm:gap-5 lg:gap-6 pl-0 m-0 py-7 px-4 sm:px-6`}>
              {Array.from({ length: 2 }, (_, copyIndex) =>
                Array.from(Array(8), (_, i) => (
                  <li
                    key={`${copyIndex}-${i}`}
                    className="flex-none animate-fadeinup"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <TarotDrawCard
                      isPaused={false}
                      isFlipped={false}
                      backcard={backcard}
                      handleClickDetail={() => console.log("")}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center items-center py-10 animate-fadeindowncard">
            <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 opacity-0 animate-fadein">
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
                    <h4 className="text-2xl md:text-3xl font-bold text-white">
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
                    <p className={`text-sm text-white/50 animate-pulse ${
                      tarotContext?.isReverse ? "text-red-400" : "text-green-400"
                    }`}>
                      {tarotContext?.isReverse ? "🔮 Card is Reversed" : "✨ Card is Upright"}
                    </p>
                    <p className="text-sm text-white/50">Click on the card for more details</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="py-8 flex justify-center">
          <button
            className={`rounded-[20px] bg-[#a88c26] py-3 px-10 text-white font-semibold text-[18px] hover:scale-105 transition-all duration-300 animate-bounce-once ${
              isButtonDisable ? "opacity-50 cursor-not-allowed" : ""
            } ${isShuffling ? "animate-pulse" : ""}`}
            onClick={() => {
              toggleAnimation();
            }}
            disabled={isButtonDisable}
          >
            {isShuffling ? "🔮 Shuffling..." : isRevealed ? "Draw Another Card" : "Draw Your Fate"}
          </button>
        </div>
      </div>
    </>
  );
}

export default TarotDrawSection;
