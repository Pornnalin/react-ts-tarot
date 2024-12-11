import { useContext, useState } from "react";
import backcard from "../assets/Images/backcard.png";
import { TarotContext } from "../context/tarotContext";

function TarotDrawSection() {
  const tarotContext = useContext(TarotContext);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toggleAnimation = () => {
    if (!isPaused) {
      tarotContext?.handleRandCard();
      setTimeout(() => {
        setIsPaused(!isPaused);
        setIsFlipped(!isFlipped);
      }, 400);
    } else {
      setIsFlipped(!isFlipped);
      setTimeout(() => {
        setIsPaused(!isPaused);
      }, 400);
    }
  };

  const getRandImage = () => {
    console.log(tarotContext?.randCardDetail?.name);
    return tarotContext?.getImage(tarotContext?.randCardDetail?.name || "");
  };

  return (
    <div className="relative text-center my-[40px] py-[40px] overflow-x-hidden h-full">
      <h3 className="text-[40px] py-2">
        Let the Cards Guide You, Choose One to Reveal Your Path
      </h3>
      <div className="w-[200%]">
        <div
          className={`py-7 w-[100%] sliderCard ${isPaused ? "paused" : ""} `}
        >
          <ul className="flex pl-0 m-0 ">
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flip-card ${
                  isPaused ? "hover:scale-110 transition-all" : ""
                }`}
              >
                <div
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                >
                  <div className="flip-card-front">
                    <img src={backcard} alt="front of card" />
                  </div>
                  <div className="flip-card-back">
                    <img src={getRandImage()} alt="back of card" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 flex justify-center">
        <button
          className="rounded-[26px] bg-[#A88C26] py-[10px] px-[26px] text-white font-medium text-[16px]"
          onClick={() => {
            toggleAnimation();
          }}
        >
          Draw Your Fate
        </button>
      </div>
    </div>
  );
}

export default TarotDrawSection;

// <div className="front">
//   <img src={backcard} alt="back of card" />
// </div>
// <div className="back">
//   <img src={getRandImage()} alt="front of card" />
// </div>
