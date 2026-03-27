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
            {!tarotContext?.isReverse ? (
              <div className="relative rounded-t-full border-2 border-[#a88c26]/60 hover:border-[#a88c26] transition-all duration-300 group">
                <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-[#a88c26]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="rounded-t-full overflow-hidden relative bg-[#0a0a0a]">
                  <img
                    className="w-[280px] md:w-[320px] opacity-95 hover:opacity-100 transition-opacity duration-300"
                    src={tarotContext?.cardDetail?.src}
                    alt={tarotContext?.cardDetail?.src}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="relative rounded-t-full border-2 border-[#a88c26]/60 hover:border-[#a88c26] transition-all duration-300 rotate-180 group">
                <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-[#a88c26]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-180"></div>
                <div className="rounded-b-full overflow-hidden rotate-180 relative bg-[#0a0a0a]">
                  <img
                    className="w-[280px] md:w-[320px] opacity-95 hover:opacity-100 transition-opacity duration-300"
                    src={tarotContext?.cardDetail?.src}
                    alt={tarotContext?.cardDetail?.src}
                    loading="lazy"
                  />
                </div>
              </div>
            )}
            <button
              className="rounded-[20px] bg-gradient-to-r from-[#8b6914] to-[#4a3060] py-3 px-10 text-white font-semibold text-[16px] hover:scale-105 hover:shadow-[0_4px_20px_rgba(168,140,38,0.5)] transition-all duration-300 shadow-[0_4px_15px_rgba(168,140,38,0.3)] animate-bounce-once"
              onClick={tarotContext?.handleReverse}
            >
              Reverse
            </button>
          </div>

          {/* Right Column - Card Details */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            {/* Card Name & Type */}
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[#e8e4e4]">
                {tarotContext?.cardDetail?.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <span className="capitalize rounded-[20px] cursor-default bg-gradient-to-r from-[#8b6914] to-[#4a3060] py-2 px-6 text-white font-medium text-[14px] shadow-[0_4px_15px_rgba(168,140,38,0.3)]">
                  {tarotContext?.cardDetail?.type}
                </span>
                {tarotContext?.cardDetail?.suit &&
                  tarotContext?.cardDetail?.suit?.length > 0 && (
                    <span className="capitalize rounded-[20px] cursor-default bg-gradient-to-r from-[#8b6914] to-[#4a3060] py-2 px-6 text-white font-medium text-[14px] shadow-[0_4px_15px_rgba(168,140,38,0.3)]">
                      {tarotContext?.cardDetail?.suit}
                    </span>
                  )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-[#a88c26]">Description</h2>
              <p
                className={`overflow-hidden overflow-y-scroll scroll-smooth no-bg-scroll text-[#94a3b8] leading-relaxed ${
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
              <p className={`text-[#94a3b8] leading-relaxed ${isThai ? "text-thai" : ""}`}>
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
