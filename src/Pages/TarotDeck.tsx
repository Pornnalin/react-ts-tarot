import { useContext, useEffect, useState } from "react";
import FilterButton from "../components/FilterButton";
import Navbar from "../components/Navbar";
import ShowTarotCard from "../components/ShowTarotCard";
import { TarotContext } from "../context/tarotContext";

// Extend Window interface to include searchTimeout
declare global {
  interface Window {
    searchTimeout?: ReturnType<typeof setTimeout>;
  }
}

export default function TarotDeck() {
  const tarotContext = useContext(TarotContext);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const loadCards = async () => {
      try {
        await tarotContext?.fetchCards();
      } catch (error) {
        console.error("Failed to load cards:", error);
        // Retry logic - try up to 3 times
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            loadCards();
          }, 2000 * (retryCount + 1)); // Exponential backoff
        }
      }
    };

    loadCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-50 animate-pulse">
          ⚠️ You are offline. Some features may not work properly.
        </div>
      )}
      {retryCount > 0 && retryCount < 3 && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white py-2 px-4 text-center z-50">
          🔄 Retrying connection... (Attempt {retryCount}/3)
        </div>
      )}
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <form action="" className="pt-8 pb-6 animate-fadeindown">
          <div className="flex gap-4 justify-start">
            <input
              type="text"
              value={tarotContext?.searchDeckPage}
              placeholder="Search by card or meaning..."
              className="md:w-[60%] w-full py-3 px-5 rounded-full border-2 border-[#a88c26]/30 bg-[#181717]/80 backdrop-blur-sm text-left text-[16px] text-white focus:outline-none focus:border-[#a88c26] transition-all duration-300"
              onChange={(e) => {
                const value = e.target.value;
                tarotContext?.setSearchDeckPage(value);

                // Debounce search to avoid API spam and improve performance
                clearTimeout(window.searchTimeout);
                window.searchTimeout = setTimeout(() => {
                  if (value.trim() === "") {
                    // Reset to all cards when search is cleared
                    tarotContext?.fetchCards();
                  } else {
                    tarotContext?.searchInDeckPage(value);
                  }
                }, 500);
              }}
            />
          </div>
        </form>
        <div className="animate-fadeindown">
          <FilterButton />
        </div>
        <div>
          {tarotContext?.allCard && tarotContext?.allCard.length > 0 ? (
            <div className="py-4 flex justify-end gap-6 items-center animate-fadeindown">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  tarotContext.current === 1 || tarotContext.maxPage === 0
                    ? "cursor-default text-gray-600 bg-gray-800/50"
                    : "bg-[#a88c26] text-white hover:scale-105 animate-bounce-once"
                }`}
                onClick={tarotContext.goToBackPage}
                disabled={tarotContext.current === 1 || tarotContext.maxPage === 0}
              >
                ← Prev
              </button>
              <span className="text-sm font-medium text-white min-w-[80px] text-center">
                {tarotContext.maxPage > 0 ? `${tarotContext.current} / ${tarotContext.maxPage}` : '--'}
              </span>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  tarotContext.current === tarotContext.maxPage || tarotContext.maxPage === 0
                    ? "cursor-default text-gray-600 bg-gray-800/50"
                    : "bg-[#a88c26] text-white hover:scale-105 animate-bounce-once"
                }`}
                onClick={tarotContext.goToNextPage}
                disabled={tarotContext.current === tarotContext.maxPage || tarotContext.maxPage === 0}
              >
                Next →
              </button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <ShowTarotCard key={tarotContext?.current} />
      </div>
    </div>
  );
}
