import NavbarDetail from "../components/NavbarDetail";
// import { GoMoon } from "react-icons/go";
import { TarotContext } from "../context/tarotContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { tarotMeaningsAll } from "../data/tarotMeaningsAll78_complete.ts";
import { BsTranslate } from "react-icons/bs";

function DetailTarotCard() {
  const tarotContext = useContext(TarotContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isThai, setIsThai] = useState(false);

  const nameKey = tarotContext?.cardDetail?.name?.toLowerCase().trim();
  const meaningData = nameKey ? tarotMeaningsAll[nameKey] : undefined;

  const translatedMeaning = tarotContext?.isReverse
    ? meaningData?.meaning_rev_th
    : meaningData?.meaning_up_th;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 700);

    // Clear timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const storedCardDetail = localStorage.getItem("cardDetail");
    if (storedCardDetail) {
      tarotContext?.setCardDetail(JSON.parse(storedCardDetail));
    }
    // Note: Don't override isReverse from localStorage here since it should come from the card draw
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto sm:px-[70px] px-[30px] h-full">
      <NavbarDetail />
      {!isLoaded ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 py-12 animate-fadein">
          {/* Left Column - Card Image */}
          <div className="flex flex-col justify-center items-center gap-8 lg:w-1/2">
            {/* Outer border */}
            <div className={`relative rounded-t-full border-2 border-[#a88c26] bg-black p-[5px] transition-all duration-500 ${
              tarotContext?.isReverse ? "rotate-180" : ""
            }`}>
              {/* Inner border */}
              <div className="rounded-t-full border-2 border-[#a88c26] overflow-hidden bg-[#0a0a0a]">
                <img
                  className="w-[280px] md:w-[320px] block"
                  src={tarotContext?.cardDetail?.src}
                  alt={tarotContext?.cardDetail?.src}
                  loading="lazy"
                />
              </div>
            </div>
            <button
              className="rounded-[20px] bg-[#a88c26] py-3 px-10 text-white font-semibold text-[16px] hover:scale-105 transition-all duration-300 animate-bounce-once"
              onClick={tarotContext?.handleReverse}
            >
              Reverse
            </button>
          </div>

          {/* Right Column - Card Details */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            {/* Card Name & Type */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
                {tarotContext?.cardDetail?.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <span className="capitalize rounded-[20px] cursor-default bg-[#a88c26] py-2 px-6 text-white font-medium text-[14px] ">
                  {tarotContext?.cardDetail?.type}
                </span>
                {tarotContext?.cardDetail?.suit &&
                  tarotContext?.cardDetail?.suit?.length > 0 && (
                    <span className="capitalize rounded-[20px] cursor-default bg-[#a88c26] py-2 px-6 text-white font-medium text-[14px] ">
                      {tarotContext?.cardDetail?.suit}
                    </span>
                  )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-[#a88c26]">Description</h2>
              <p
                data-lenis-prevent
                className={`overflow-hidden overflow-y-scroll scroll-smooth no-bg-scroll text-white/50 leading-relaxed ${
                  tarotContext?.cardDetail?.desc &&
                  tarotContext?.cardDetail?.desc.length > 350
                    ? "max-h-[250px] "
                    : "max-h-[150px]"
                }`}
              >
                {tarotContext?.cardDetail?.desc}
              </p>
            </div>

            {/* Meaning */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#a88c26]">Meaning</h2>
                <button
                  className="p-2 rounded-lg hover:bg-[#a88c26]/20 transition-colors duration-300 text-[#a88c26]"
                  onClick={() => setIsThai((prev) => !prev)}
                >
                  <BsTranslate size={20} />
                </button>
              </div>
              <p className={`text-white/50 leading-relaxed ${isThai ? "text-thai" : ""}`}>
                {isThai
                  ? translatedMeaning || "not found"
                  : tarotContext?.isReverse
                  ? tarotContext?.cardDetail?.meaning_rev
                  : tarotContext?.cardDetail?.meaning_up}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailTarotCard;
