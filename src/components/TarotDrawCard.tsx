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
      className={`flip-card ${
        isPaused ? "hover:scale-110 transition-all" : ""
      }`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={backcard}
            alt="front of card"
            className=""
            loading="lazy"
          />
        </div>
        <div
          className={`flip-card-back ${isFlipped ? "flipped" : ""} ${
            isReversed && isFlipped ? "reversed" : ""
          }`}
        >
          <img
            src={getRandImage()}
            className=""
            alt="back of card"
            loading="lazy"
            onClick={handleClickDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default TarotDrawCard;
