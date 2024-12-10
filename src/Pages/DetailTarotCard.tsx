import NavbarDetail from "../components/NavbarDetail";
// import { GoMoon } from "react-icons/go";
import { TarotContext } from "../context/tarotContext";
import { useContext } from "react";

function DetailTarotCard() {
  const tarotContext = useContext(TarotContext);

  return (
    <div className="max-mx-auto px-[70px] h-full">
      <NavbarDetail />
      <div className="flex h-full ">
        <div className="w-[50%] h-full flex flex-col justify-center items-center gap-4 ">
          <div className="rounded-t-full border-[3px] p-2 border-[#A88C26]">
            <div className="rounded-t-full border-[2px] p-2 border-[#A88C26]">
              <div className="rounded-t-full overflow-hidden">
                <img
                  className="w-[280px]"
                  src={tarotContext?.cardDetail?.src}
                  alt={tarotContext?.cardDetail?.src}
                />
              </div>
            </div>
          </div>
          <button className="rounded-[20px] bg-[#A88C26] py-1 px-6 text-black font-medium text-[16px]">
            Reverse
          </button>
        </div>
        <div className="flex flex-col  justify-start mr-[90px] w-[70%]">
          <div className="pt-10 pb-3 flex flex-col gap-1">
            <p className="text-[60px] font-bold">
              {tarotContext?.cardDetail?.name}
            </p>
            <p className="h-[250px] overflow-hidden overflow-y-scroll scroll-smooth no-bg-scroll">
              {tarotContext?.cardDetail?.desc}
            </p>
          </div>
          <div className="py-10 flex flex-col gap-1">
            <p className="text-[40px] font-bold">Meaning</p>
            <p>{tarotContext?.cardDetail?.meaning_up}</p>
            <div className="py-3 flex gap-5">
              <button className="rounded-[20px] bg-[#A88C26] py-1 px-6 text-black font-medium text-[14px]">
                {tarotContext?.cardDetail?.type}
              </button>
              {tarotContext?.cardDetail?.suit &&
                tarotContext?.cardDetail?.suit?.length > 0 && (
                  <button className="rounded-[20px] bg-[#A88C26] py-1 px-6 text-black font-medium text-[14px]">
                    {tarotContext?.cardDetail?.suit}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="inline-flex items-center justify-center w-full mb-10">
        <hr className="w-full h-[0.1px] bg-gray-500 border-0 rounded dark:bg-gray-400" />
        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
          <GoMoon className="text-2xl" />
        </div>
      </div> */}
    </div>
  );
}

export default DetailTarotCard;
