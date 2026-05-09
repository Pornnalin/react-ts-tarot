import { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import TarotCard from "./TarotCard";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

function ShowTarotCard() {
  const tarotContext = useContext(TarotContext);

  const location = useLocation();

  const shortDesc = (desc: string) => {
    const result = desc.slice(0, 40).concat("...");
    return result;
  };
  if (tarotContext?.isLoading) {
    return <Loading />;
  }

  if (!tarotContext?.allCard || tarotContext?.allCard.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">🔮</div>
        <h3 className="text-2xl font-bold text-white mb-2">Cards Not Found</h3>
        <p className="text-white/50 mb-6">
          Unable to load tarot cards. Please check your internet connection and try again.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => tarotContext?.fetchCards()}
            className="rounded-[20px] bg-[#a88c26] py-3 px-10 text-white font-semibold text-[16px] hover:scale-105 transition-all duration-300 animate-bounce-once"
          >
            🔄 Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-[20px] bg-[#181717] py-3 px-10 text-white font-semibold text-[16px] hover:scale-105 transition-all duration-300 border-2 border-[#a88c26]/50"
          >
            🔄 Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {location.pathname !== "/tarotdeck" ? (
        <div className="grid py-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8">
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
        <div className="grid py-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 justify-items-center gap-8">
          {tarotContext?.allCard && tarotContext?.allCard.length > 0 ? (
            <>
              {tarotContext?.allCard
                .slice(tarotContext.startIndex, tarotContext.endIndex)
                .map((item, index) => (
                  <TarotCard
                    key={index}
                    name={item.name}
                    desc={shortDesc(item.desc)}
                    img={tarotContext?.getImage(item.name)}
                    delay={`${index * 60}ms`}
                  />
                ))}
            </>
          ) : (
            <p>Not Found</p>
          )}
        </div>
      )}
    </>
  );
}

export default ShowTarotCard;
