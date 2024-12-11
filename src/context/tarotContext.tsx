import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { tarotCardImages } from "../components/TarotCardImages";
import { useLocation } from "react-router-dom";

interface CardList {
  type: string;
  suit: string;
  name_short: string;
  name: string;
  value: string;
  value_int: number;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  src: string;
}
interface TarotContextType {
  fetchSearchResults: (input: string) => Promise<void>;
  handleFilterType: (selectType: string) => void;
  handleFilterSuit: (selectSuit: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cardList: CardList[];
  allCard: CardList[];
  tarotCardGallery: typeof tarotCardImages;
  cardDetail: CardList | undefined;
  selectNameCard: string;
  setSelectNameCard: React.Dispatch<React.SetStateAction<string>>;
  setCardDetail: React.Dispatch<React.SetStateAction<CardList | undefined>>;
  getImage: (nameImage: string) => string; //ส่งคืนกลับมาเป็นชื่อภาพ
  selectIndexType: string | undefined;
  getIndexType: (index: string) => void;
  setSelectIndexType: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectIndexSuit: string;
  getIndexSuit: (index: string) => void;
  setSelectIndexSuit: React.Dispatch<React.SetStateAction<string>>;
  sortAZ: () => void;
  sortZA: () => void;
  isReverse: boolean;
  handleReverse: () => void;
  isLoading: boolean;
  fetchCards: () => void;
  handleRandCard: () => void;
  randCardDetail: CardList | undefined;
  searchDeckPage: string;
  setSearchDeckPage: React.Dispatch<React.SetStateAction<string>>;
  searchInDeckPage: (input: string) => Promise<void>;
}

interface TarotProviderProps {
  children: ReactNode;
}

export const TarotContext = createContext<TarotContextType | undefined>(
  undefined
);
export function TarotProvider({ children }: TarotProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [searchDeckPage, setSearchDeckPage] = useState<string>("");
  const [cardList, setCardList] = useState<CardList[]>([]);
  const [allCard, setAllCard] = useState<CardList[]>([]); //การ์ดตั้งต้นทั้งหมดใช้ในหน้า tarotdeck
  const [originSearchCardList, setSearchOriginCardList] = useState<CardList[]>(
    []
  );
  const [cardDetail, setCardDetail] = useState<CardList | undefined>(undefined);
  const [randCardDetail, setRandCardDetail] = useState<CardList | undefined>(
    undefined
  );
  const [selectNameCard, setSelectNameCard] = useState<string>("");
  const [selectIndexType, setSelectIndexType] = useState<string | undefined>(
    undefined
  );
  const [selectIndexSuit, setSelectIndexSuit] = useState<string>("");
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSearchResults = async (input: string) => {
    if (input.trim() == "") {
      return;
    }
    const apiSearch = `https://tarotapi.dev/api/v1/cards/search?q=${input}`;
    try {
      setIsLoading(true);
      const response = await axios.get(apiSearch);
      // console.log(apiSearch);
      console.log(response.data.cards);
      setCardList(response.data.cards);
      setSearchOriginCardList(response.data.cards);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const searchInDeckPage = async (input: string) => {
    const apiSearch = `https://tarotapi.dev/api/v1/cards/search?q=${input}`;
    try {
      setIsLoading(true);
      const response = await axios.get(apiSearch);
      setAllCard(response.data.cards);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCards = async () => {
    try {
      const response = await axios.get(`https://tarotapi.dev/api/v1/cards/`);
      setAllCard(response.data.cards);
      // setCardList(response.data.cards);
      setSearchOriginCardList(response.data.cards);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRandCard = async () => {
    try {
      const res = await axios.get(
        "https://tarotapi.dev/api/v1/cards/random?n=1"
      );
      const rand = res.data.cards[0];
      setRandCardDetail(rand);
      console.log(rand.name);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (window.location.pathname === "/tarotdeck") fetchCards();
  }, []);

  const handleFilterType = (selectType: string) => {
    let resType = [];
    if (window.location.pathname === "/tarotdeck") {
      resType = originSearchCardList.filter(
        (item) => item.type.toLowerCase() === selectType.toLowerCase()
      );
      setAllCard(resType);
    } else {
      resType = originSearchCardList.filter(
        (item) => item.type.toLowerCase() === selectType.toLowerCase()
      );
      setCardList(resType);
    }
  };
  const handleFilterSuit = (selectSuit: string) => {
    let resSuit = [];
    if (window.location.pathname === "/tarotdeck") {
      resSuit = originSearchCardList.filter(
        (item) => item.suit !== "" && item.suit === selectSuit
      );
      setAllCard(resSuit);
    } else {
      resSuit = originSearchCardList.filter(
        (item) => item.suit !== "" && item.suit === selectSuit
      );
      setCardList(resSuit);
    }
  };

  const getIndexType = (index: string) => {
    setSelectIndexType(index);
  };
  const getIndexSuit = (index: string) => {
    setSelectIndexSuit(index);
  };
  const sortAZ = () => {
    let sort = [];
    if (window.location.pathname === "/tarotdeck") {
      sort = [...originSearchCardList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setAllCard(sort);
    } else {
      sort = [...originSearchCardList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCardList(sort);
    }
    console.log("a-z");
  };

  const sortZA = () => {
    let sort = [];
    if (window.location.pathname === "/tarotdeck") {
      sort = [...originSearchCardList].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setAllCard(sort);
    } else {
      sort = [...originSearchCardList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCardList(sort);
    }
    console.log("a-z");
  };
  const handleReverse = () => {
    setIsReverse((prev) => !prev);
  };
  useEffect(() => {
    const findItem = allCard.find((item) => item.name === selectNameCard);

    if (findItem) {
      setCardDetail({
        type: findItem.type,
        suit: findItem.suit ? findItem.suit : "",
        name_short: findItem.name_short,
        name: findItem.name,
        value: findItem.value,
        value_int: findItem.value_int,
        meaning_up: findItem.meaning_up,
        meaning_rev: findItem.meaning_rev,
        desc: findItem.desc,
        src: getImage(findItem.name),
      });
    }
  }, [selectNameCard]);

  function getImage(nameImage: string): string {
    const foundItem = tarotCardImages.find((item) => {
      return item.name.trim().toLowerCase() === nameImage.trim().toLowerCase();
    });
    if (foundItem) {
      return foundItem.src;
    } else {
      console.log(`Not found ${nameImage}`);
      return "";
    }
  }

  return (
    <TarotContext.Provider
      value={{
        fetchSearchResults,
        search,
        setSearch,
        cardList,
        tarotCardGallery: tarotCardImages,
        handleFilterType,
        allCard,
        cardDetail,
        selectNameCard,
        setSelectNameCard,
        setCardDetail,
        getImage,
        getIndexType,
        selectIndexType,
        setSelectIndexType,
        selectIndexSuit,
        setSelectIndexSuit,
        getIndexSuit,
        handleFilterSuit,
        sortAZ,
        sortZA,
        isReverse,
        handleReverse,
        isLoading,
        fetchCards,
        handleRandCard,
        randCardDetail,
        searchDeckPage,
        searchInDeckPage,
        setSearchDeckPage,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
}
