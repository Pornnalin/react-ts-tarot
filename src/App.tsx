import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./Pages/Explore.tsx";
import TarotDeck from "./Pages/TarotDeck.tsx";
import TarotDraw from "./Pages/TarotDraw.tsx";
import DetailTarotCard from "./Pages/DetailTarotCard.tsx";
import NotFound from "./components/NotFound.tsx";
import { TarotProvider } from "./context/tarotContext.tsx";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Explore />,
    },
    {
      path: "/tarotdeck",
      element: <TarotDeck />,
    },
    {
      path: "/tarotdraw",
      element: <TarotDraw />,
    },
    {
      path: "/detailtarotcard/:name",
      element: <DetailTarotCard />,
    },
    {
      path: "*", //
      element: <NotFound />,
    },
  ]);
  return (
    <TarotProvider>
      <div className="relative w-screen max-w-full overflow-x-hidden min-h-screen px-0 mx-0">
        <RouterProvider router={router} />
      </div>
    </TarotProvider>
  );
}

export default App;
