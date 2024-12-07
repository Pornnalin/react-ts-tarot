import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./Pages/Explore.tsx";
import TarotDeck from "./Pages/TarotDeck.tsx";
import TarotDraw from "./Pages/TarotDraw.tsx";
import DetailTarotCard from "./Pages/DetailTarotCard.tsx";
import NotFound from "./components/NotFound.tsx";
import { TarotProvider } from "./context/tarotContext.tsx";

function App() {
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
      <div className="w-full h-[100vh] px-0 max-0 ">
        <RouterProvider router={router} />
      </div>
    </TarotProvider>
  );
}

export default App;
