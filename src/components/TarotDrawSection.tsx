import { useContext, useState } from "react";
import backcard from "../assets/Images/backcard.jpg";
import { TarotContext } from "../context/tarotContext";
import { useNavigate } from "react-router-dom";
import TarotDrawCard from "./TarotDrawCard";
function TarotDrawSection() {
  const tarotContext = useContext(TarotContext);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

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
      setTimeout(() => {
        setIsPaused(!isPaused);
      }, 400);
      setTimeout(() => {
        setIsFlipped(!isFlipped);
      }, 1500);
    } else {
      setIsFlipped(!isFlipped);
      setTimeout(() => {
        setIsPaused(!isPaused);
      }, 400);
    }
  };

  return (
    <>
      <div className="relative text-center my-[40px]  sm:py-[40px] overflow-x-hidden h-full">
        <h3 className="text-xl sm:text-[40px] py-2 mx-4 sm:mx-0 md:mx-10 leading-relaxed ">
          Let the Cards Guide You, Choose One to Reveal Your Path
        </h3>
        {!isPaused ? (
          <div className="w-[200%]">
            <div
              className={` py-7 w-[100%] sliderCard ${
                isPaused ? "animate-fadeout" : ""
              } `}
            >
              <ul className="flex pl-0 m-0 ">
                {Array.from(Array(8), (_, i) => {
                  return (
                    <li key={i}>
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
          <div className="flex justify-center items-end overflow-hidden">
            <div
              className={`py-7 ${isPaused ? "animate-fadeindowncard" : ""} `}
            >
              <ul className="flex pl-0 m-0 ">
                <li className="cursor-pointer">
                  <TarotDrawCard
                    isPaused={isPaused}
                    isFlipped={isFlipped}
                    backcard={backcard}
                    handleClickDetail={handleClickDetail}
                  />
                </li>
              </ul>
            </div>
          </div>
        )}

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
    </>
  );
}

export default TarotDrawSection;
