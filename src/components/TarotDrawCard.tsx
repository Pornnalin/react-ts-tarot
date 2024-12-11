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
    console.log(tarotContext?.randCardDetail?.name);
    return tarotContext?.getImage(tarotContext?.randCardDetail?.name || "");
  };

  return (
    <div
      className={`flip-card ${
        isPaused ? "hover:scale-110 transition-all" : ""
      }`}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <img src={backcard} alt="front of card" />
        </div>
        <div className="flip-card-back">
          <img
            src={getRandImage()}
            alt="back of card"
            onClick={handleClickDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default TarotDrawCard;
