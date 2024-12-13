import NavbarDetail from "../components/NavbarDetail";
// import { GoMoon } from "react-icons/go";
import { TarotContext } from "../context/tarotContext";
import { useContext, useEffect, useState } from "react";

function DetailTarotCard() {
  const tarotContext = useContext(TarotContext);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Clear timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-mx-auto sm:px-[70px] px-[30px] h-full ">
      <NavbarDetail />
      {!isLoaded ? (
        <div
          role="status"
          className=" w-full flex justify-center h-[20vh] pt-20"
        >
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#A88C26]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center sm:px-0 px-[20px] sm:flex sm:flex-row sm:h-full animate-fadein">
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
          <div className="flex flex-col justify-center sm:mr-[90px] sm:w-[70%] md:mr-0 md:w-[100%] ">
            <div className="pt-10 pb-3 flex flex-col gap-1">
              <p className="text-3xl sm:text-[60px] font-bold">
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
