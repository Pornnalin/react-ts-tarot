import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TarotContext } from "../context/tarotContext";
import { useContext } from "react";
function NavbarDetail() {
  const tarotContext = useContext(TarotContext);

  return (
    <div className="py-10 flex justify-between items-center">
      <Link
        to="/"
        className="inline-flex items-center gap-5"
        onClick={() => tarotContext?.setCardList([])}
      >
        <FaArrowLeftLong />
        <p className="sm:text-base text-[12px] hover:underline">Explore</p>
      </Link>
      <div className="flex items-center justify-center">
        <nav className=" font-semibold">
          <ul className="flex sm:space-x-14">
            <li className="py-2 px-5 text-[10px] sm:text-base hover:underline">
              <Link to="/tarotdeck" onClick={tarotContext?.fetchCards}>
                Tarot Deck
              </Link>
            </li>
            <li className=" ">
              <button className="py-1 px-1 sm:py-2 sm:px-5 rounded-[20px] bg-[#A88C26] text-[10px] sm:text-base hover:opacity-70 ">
                <Link to="/tarotdraw">Your Tarot Draw</Link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavbarDetail;
