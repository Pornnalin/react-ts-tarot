import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TarotContext } from "../context/tarotContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const navLinks = [
  { to: "/", label: "Explore" },
  { to: "/tarotdeck", label: "Tarot Deck" },
  { to: "/tarotdraw", label: "Your Tarot Draw" },
];

function Navbar() {
  const tarotContext = useContext(TarotContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ปิด mobile menu เมื่อเปลี่ยน route
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? ""
          : ""
      }`}
    >
      <div className="py-6 flex flex-row justify-between items-center">
        {/* Brand */}
        <div className="animate-fadeindown" style={{ animationDelay: "0ms" }}>
          <h3 className="font-bold text-2xl uppercase text-[#a88c26] animate-float cursor-default select-none">
            tarotwhisper
          </h3>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex font-semibold text-md">
          <ul className="flex space-x-14">
            {navLinks.map(({ to, label }, i) => (
              <li
                key={to}
                className="relative group animate-fadeindown"
                style={{ animationDelay: `${(i + 1) * 80}ms`, animationFillMode: "both" }}
              >
                <Link
                  to={to}
                  onClick={to === "/tarotdeck" ? tarotContext?.fetchCards : undefined}
                  className={`transition-colors duration-300 ${
                    isActive(to) ? "text-[#a88c26]" : "text-white hover:text-[#a88c26]"
                  }`}
                >
                  {label}
                </Link>
                <div
                  className={`absolute -bottom-1 left-0 h-px bg-[#a88c26] transition-all duration-300 ${
                    isActive(to) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger → X */}
        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          className="flex sm:hidden relative w-6 h-6 cursor-pointer"
        >
          <GiHamburgerMenu
            size={22}
            className={`absolute transition-all duration-300 ${
              isMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <IoClose
            size={22}
            className={`absolute transition-all duration-300 ${
              isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu — slide down + stagger */}
      <nav
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col border-t border-[#a88c26]/20 pb-4">
          {navLinks.map(({ to, label }, i) => (
            <li
              key={to}
              className={`transition-all duration-200 ${
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <Link
                to={to}
                onClick={to === "/tarotdeck" ? tarotContext?.fetchCards : undefined}
                className={`block px-2 py-3 font-semibold transition-all duration-200 border-l-2 ${
                  isActive(to)
                    ? "text-[#a88c26] border-[#a88c26]"
                    : "text-white border-transparent hover:text-[#a88c26] hover:border-[#a88c26]/50 hover:pl-4"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
