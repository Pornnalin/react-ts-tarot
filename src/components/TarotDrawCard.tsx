import React, { useContext } from "react";
import { TarotContext } from "../context/tarotContext";

interface TarotDrawCardProps {
  isPaused: boolean;
  isFlipped: boolean;
  backcard: string;
  handleClickDetail: React.MouseEventHandler<HTMLImageElement>;
}
function TarotDrawCard({
  isPaused,
  isFlipped,
  backcard,
  handleClickDetail,
}: TarotDrawCardProps) {
  const tarotContext = useContext(TarotContext);

  const getRandImage = () => {
    // console.log(tarotContext?.randCardDetail?.name);
    return tarotContext?.getImage(tarotContext?.randCardDetail?.name || "");
  };

  const isReversed = tarotContext?.isReverse || false;

  return (
    <div
      className={`flip-card ${!isFlipped && isPaused ? "hover:scale-105 transition-all duration-300" : ""}`}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <img
            src={backcard}
            alt="front of card"
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
            decoding="sync"
          />
        </div>
        <div className={`flip-card-back ${isReversed ? "reversed" : ""}`}>
          <img
            src={getRandImage()}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            alt="back of card"
            loading="eager"
            decoding="sync"
            onClick={handleClickDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default TarotDrawCard;
