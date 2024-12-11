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
      <div className="inline-flex relative pr-8">
        <h3 className="font-bold text-2xl">TAROT</h3>
      </div>

      {/* Desktop Navigation */}
      <div className="้flex">
        <nav className="font-semibold text-md">
          <ul className="flex space-x-14">
            <li>
              <Link to="/">Explore</Link>
            </li>
            <li>
              <Link to="/tarotdeck" onClick={tarotContext?.fetchCards}>
                Tarot Deck
              </Link>
            </li>
            <li>
              <Link to="/tarotdraw">Your Tarot Draw</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex sm:hidden">
        <div className="flex items-center">
          <GiHamburgerMenu
            className="align-middle text-center cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        {isMenuOpen && (
          <nav className="absolute top-20 right-0 left-0 bg-black p-5  z-10 ">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/" onClick={toggleMenu}>
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/tarotdeck"
                  onClick={() => {
                    tarotContext?.fetchCards();
                    toggleMenu();
                  }}
                >
                  Tarot Deck
                </Link>
              </li>
              <li>
                <Link to="/tarotdraw" onClick={toggleMenu}>
                  Your Tarot Draw
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Navbar;
