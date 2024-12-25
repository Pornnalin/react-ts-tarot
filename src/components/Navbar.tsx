import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { RiSparkling2Fill } from "react-icons/ri";
import { TarotContext } from "../context/tarotContext";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const tarotContext = useContext(TarotContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="py-10 flex flex-row justify-between">
      <div className="inline-flex pr-8">
        <h3 className="font-bold text-2xl uppercase">tarotwhisper</h3>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        <nav className="font-semibold text-md">
          <ul className="flex space-x-14">
            <li className="hover:underline">
              <Link to="/">Explore</Link>
            </li>
            <li className="hover:underline">
              <Link to="/tarotdeck" onClick={tarotContext?.fetchCards}>
                Tarot Deck
              </Link>
            </li>
            <li className="hover:underline">
              <Link to="/tarotdraw">Your Tarot Draw</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex sm:hidden overflow-hidden">
        <div className="flex items-center">
          <GiHamburgerMenu
            className="align-middle text-center cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        <nav
          className={`transition-all duration-[.7s] absolute top-20 right-0 left-0  bg-black p-5 z-10 opacity-0 ${
            isMenuOpen
              ? "opacity-100 translate-x-0" // translate-x-0
              : "opacity-0 translate-x-full" //translate-x-full
          } `}
        >
          <ul className="flex flex-col space-y-4">
            <li className="hover:underline">
              <Link to="/">Explore</Link>
            </li>
            <li className="hover:underline">
              <Link
                to="/tarotdeck"
                onClick={() => {
                  tarotContext?.fetchCards();
                }}
              >
                Tarot Deck
              </Link>
            </li>
            <li className="hover:underline">
              <Link to="/tarotdraw">Your Tarot Draw</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
