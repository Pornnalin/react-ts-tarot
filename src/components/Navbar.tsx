import { Link } from "react-router-dom";
// import { RiSparkling2Fill } from "react-icons/ri";
function Navbar() {
  return (
    <div className="py-10 flex flex-col md:flex-row justify-between">
      <div className="inline-flex relative pr-8">
        <h3 className="font-bold text-2xl">TAROT</h3>
        {/* <RiSparkling2Fill className="text-lg absolute right-0 bottom-6" /> */}
      </div>
      <div className="flex sm:flex-col">
        <nav className=" font-semibold text-md">
          <ul className="flex space-x-14">
            <li>
              <Link to="/">Explore</Link>
            </li>
            <li>
              <Link to="/tarotdeck">Tarot Deck</Link>
            </li>
            <li>
              <Link to="/tarotdraw">Your Tarot Draw</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
