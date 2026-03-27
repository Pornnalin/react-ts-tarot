import TarotDrawSection from "../components/TarotDrawSection";
import TarotSearch from "../components/TarotSearch";
import Navbar from "../components/Navbar";

export default function Explore() {
  return (
    <>
      <div className="relative">
        {/* Mystical background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#a88c26]/5 via-purple-900/5 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <div className="animate-fadeindown">
            <TarotSearch />
          </div>
        </div>
        <div className="animate-fadein">
          <TarotDrawSection />
        </div>
      </div>
      <footer className="relative bg-gradient-to-t from-[#0a0a0a]/80 to-transparent backdrop-blur-sm text-white py-6 mt-16 border-t border-[#a88c26]/20">
        <div className="relative max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <p className="text-md">
            <a
              href="mailto:p.pornnalin.s@gmail.com"
              className="text-[#a88c26] hover:text-[#6d4c7d] transition duration-300"
            >
              Contact me
            </a>
          </p>
          <p className="text-sm text-[#94a3b8]">&copy; 2024 Pornnalin</p>
        </div>
      </footer>
    </>
  );
}
