import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
function NavbarDetail() {
  return (
    <div className="py-10 flex justify-between">
      <Link to="/" className="inline-flex items-center gap-5">
        <FaArrowLeftLong />
        <p>Explore</p>
      </Link>
      <div className="flex">
        <nav className=" font-semibold">
          <ul className="flex space-x-14">
            <li className="py-2 px-5">
              <Link to="/tarotdeck">Tarot Deck</Link>
            </li>
            <li className="py-2 px-5 rounded-[20px] bg-[#A88C26] text-md">
              <Link to="/tarotdraw">Your Tarot Draw</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavbarDetail;
