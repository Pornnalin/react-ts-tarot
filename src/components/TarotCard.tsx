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
      className="flex flex-col max-w-[230px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] box-border rounded-t-full overflow-hidden cursor-pointer animate-fadeinup relative group"
      onClick={handleClickDetail}
    >
      {/* Single border with subtle glow on hover */}
      <div className="absolute inset-0 rounded-t-full border-2 border-[#a88c26]/40 hover:border-[#a88c26]/80 transition-colors duration-500 shadow-[0_0_20px_-5px_rgba(168,140,38,0.2)] group-hover:shadow-[0_0_30px_-5px_rgba(168,140,38,0.4)]"></div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-[#a88c26]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Card container */}
      <div className="relative bg-[#0a0a0a] w-full h-full overflow-hidden rounded-t-full">
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

        <img
          className="w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          src={img}
          alt="tarotCard"
          loading="lazy"
        />
      </div>

      <div className="relative px-3 py-4 bg-[#0a0a0a]">
        <div className="font-bold text-xl mb-2 truncate text-[#e8e4e4] group-hover:text-[#a88c26] transition-colors duration-300">{name}</div>
        <p className="text-base text-[#94a3b8]">{desc}</p>
      </div>

      <div className="relative pt-2 pb-2 flex justify-end bg-[#0a0a0a]">
        <span className="bg-gradient-to-r from-[#8b6914] to-[#4a3060] rounded-[20px] px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer hover:scale-105 hover:shadow-[0_4px_20px_rgba(168,140,38,0.5)] transition-all duration-300 shadow-[0_4px_15px_rgba(168,140,38,0.3)] animate-bounce-once">
          Read More
        </span>
      </div>
    </div>
  );
}

export default TarotCard;
