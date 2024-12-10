import { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import TarotCard from "./TarotCard";
import { useLocation } from "react-router-dom";

function ShowTarotCard() {
  const tarotContext = useContext(TarotContext);

  const location = useLocation();

  const shortDesc = (desc: string) => {
    const result = desc.slice(0, 90).concat("...");
    return result;
  };

  return (
    <>
      {location.pathname !== "/tarotdeck" ? (
        <div className="grid py-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[120px] gap-y-20">
          {tarotContext?.cardList.map((item, index) => (
            <TarotCard
              key={index}
              name={item.name}
              desc={shortDesc(item.desc)}
              img={tarotContext?.getImage(item.name)}
            />
          ))}
        </div>
      ) : (
        <div className="grid py-20 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-[55px]">
          {tarotContext?.allCard.map((item, index) => (
            <TarotCard
              key={index}
              name={item.name}
              desc={shortDesc(item.desc)}
              img={tarotContext?.getImage(item.name)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ShowTarotCard;
