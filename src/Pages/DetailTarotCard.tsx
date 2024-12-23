import NavbarDetail from "../components/NavbarDetail";
// import { GoMoon } from "react-icons/go";
import { TarotContext } from "../context/tarotContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

function DetailTarotCard() {
  const tarotContext = useContext(TarotContext);
  const [isLoaded, setIsLoaded] = useState(false);
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
  }, []);
  return (
    <div className="max-mx-auto sm:px-[70px] px-[30px] h-full ">
      <NavbarDetail />
      {!isLoaded ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center sm:px-0 px-[20px] lg:flex lg:flex-row lg:h-full animate-fadein">
          <div className="sm:w-[50%] md:w-[100%] h-full flex flex-col justify-center items-center gap-4 ">
            {!tarotContext?.isReverse ? (
              <div className="rounded-t-full border-[3px] p-2 border-[#A88C26] transition-transform duration-[2s]">
                <div className="rounded-t-full border-[2px] p-2 border-[#A88C26] transition-transform duration-[2s]">
                  <div className="rounded-t-full overflow-hidden">
                    <img
                      className="w-[280px] "
                      src={tarotContext?.cardDetail?.src}
                      alt={tarotContext?.cardDetail?.src}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-t-full border-[3px] p-2 border-[#A88C26] rotate-180 transition-transform duration-[2s] ">
                <div className="rounded-t-full border-[2px] p-2 border-[#A88C26] ">
                  <div className="rounded-b-full overflow-hidden rotate-180">
                    <img
                      className="w-[280px] "
                      src={tarotContext?.cardDetail?.src}
                      alt={tarotContext?.cardDetail?.src}
                    />
                  </div>
                </div>
              </div>
            )}
            <button
              className="rounded-[20px] bg-[#A88C26] py-1 px-6  text-black font-medium text-[16px]"
              onClick={tarotContext?.handleReverse}
            >
              Reverse
            </button>
          </div>
          <div className="flex flex-col justify-center lg:mr-[90px] lg:w-[70%] xl:w-[100%] xl:mr-0">
            <div className="pt-10 pb-3 flex flex-col gap-1">
              <p className="text-3xl sm:text-[60px] font-bold leading-relaxed">
                {tarotContext?.cardDetail?.name}
              </p>
              <div className="py-3 flex gap-5">
                <button className="capitalize rounded-[20px] cursor-default bg-[#A88C26] py-1 px-6 text-black font-medium text-[14px]">
                  {tarotContext?.cardDetail?.type}
                </button>
                {tarotContext?.cardDetail?.suit &&
                  tarotContext?.cardDetail?.suit?.length > 0 && (
                    <button className="capitalize rounded-[20px] cursor-default bg-[#A88C26] py-1 px-6 text-black font-medium text-[14px]">
                      {tarotContext?.cardDetail?.suit}
                    </button>
                  )}
              </div>
              <p
                className={`overflow-hidden overflow-y-scroll scroll-smooth no-bg-scroll
                ${
                  tarotContext?.cardDetail?.desc &&
                  tarotContext?.cardDetail?.desc.length > 350
                    ? "h-[250px] "
                    : "h-[100px]"
                }`}
              >
                {tarotContext?.cardDetail?.desc}
              </p>
            </div>
            <div className="py-10 flex flex-col gap-1">
              <p className="sm:text-[40px] text-2xl font-bold">Meaning</p>

              <p className="h-[100px]">
                {tarotContext?.isReverse
                  ? tarotContext?.cardDetail?.meaning_rev
                  : tarotContext?.cardDetail?.meaning_up}
              </p>
              {/* <div className="py-3 flex gap-5">
              <button className="capitalize rounded-[20px] cursor-default bg-[#A88C26] py-1 px-6 text-black font-medium text-[14px]">
                {tarotContext?.cardDetail?.type}
              </button>
              {tarotContext?.cardDetail?.suit &&
                tarotContext?.cardDetail?.suit?.length > 0 && (
                  <button className="capitalize rounded-[20px] cursor-default bg-[#A88C26] py-1 px-6 text-black font-medium text-[14px]">
                    {tarotContext?.cardDetail?.suit}
                  </button>
                )}
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailTarotCard;
