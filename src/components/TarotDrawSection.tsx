import { useState } from "react";
import backcard from "../assets/Images/backcard.png";
import thefool from "../assets/Images/The Fool.png";
function TarotDrawSection() {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const toggleAnimation = () => {
    setIsPaused(!isPaused);
  };
  return (
    <div className="relative text-center my-[40px] py-[40px]">
      <h3 className="text-[40px] py-2">
        Let the Cards Guide You, Choose One to Reveal Your Path
      </h3>
      <div className="w-[200%]">
        <div
          className={`py-7 w-[100%] sliderCard ${isPaused ? "paused" : ""} `}
        >
          <ul className="flex pl-0 m-0">
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
            <li>
              <img src={backcard} alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 flex justify-center">
        <button
          className="rounded-[26px] bg-[#A88C26] py-[10px] px-[26px] text-white font-medium text-[16px]"
          onClick={toggleAnimation}
        >
          Draw Your Fate
        </button>
      </div>
    </div>
  );
}

export default TarotDrawSection;
