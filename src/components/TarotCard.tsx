import React, { useContext } from "react";
import { TarotContext } from "../context/tarotContext";
import { useNavigate } from "react-router-dom";

interface tarotProps {
  name: string;
  img: string;
  desc: string;
}

function TarotCard({ name, img, desc }: tarotProps) {
  const tarotContext = useContext(TarotContext);
  const navigate = useNavigate();
  const handleClickDetail: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    tarotContext?.setSelectNameCard(name); //อัพเดทข้อมูลตรงนี้
    //สามารถส่งผ่านข้อมูลข้าม pageได้
    navigate(`/detailtarotcard/${name.toLowerCase().trim()}`, {
      state: { setSelectNameCard: name }, //ส่งข้อมูล
    });
  };
  return (
    <div
      className="flex flex-col max-w-[230px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] box-border rounded-t-full overflow-hidden shadow-lg bg-[#000000] cursor-pointer animate-fadeinup hover:opacity-70"
      onClick={handleClickDetail}
    >
      <div className="bg-black w-full h-full overflow-hidden  ">
        <img
          className="w-full object-cover  "
          src={img}
          alt="tarotCard"
          loading="lazy"
        />
      </div>
      <div className="px-3 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-base">{desc}</p>
      </div>
      <div className="pt-2 pb-2 flex justify-end ">
        <span className=" bg-[#A88C26] rounded-[20px] px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer hover:opacity-70">
          Read More
        </span>
      </div>
    </div>
  );
}

export default TarotCard;
