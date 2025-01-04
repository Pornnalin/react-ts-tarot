import TarotDrawSection from "../components/TarotDrawSection";
import TarotSearch from "../components/TarotSearch";
import Navbar from "../components/Navbar";

export default function Explore() {
  return (
    <>
      <div>
        <div className="max-mx-auto sm:px-[70px] px-[30px] ">
          <Navbar />
          <div className="animate-fadeindown">
            <TarotSearch />
          </div>
        </div>
        <div className="animate-fadein">
          <TarotDrawSection />
        </div>
      </div>
      <footer className="bg-[#0d0d0c] text-white py-3 mt-16">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <p className="text-md">
            <a
              href="mailto:p.pornnalin.s@gmail.com"
              className="text-[#A88C26] hover:text-[#e3bd34] transition duration-300"
            >
              Contact me
            </a>
          </p>
          <p className="text-sm">&copy; 2024 Pornnalin</p>
        </div>
      </footer>
    </>
  );
}
