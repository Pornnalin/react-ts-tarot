import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { tarotCardImages } from "../components/TarotCardImages";
import { BiUnderline } from "react-icons/bi";

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
}

interface TarotProviderProps {
  children: ReactNode;
}

export const TarotContext = createContext<TarotContextType | undefined>(
  undefined
);
export function TarotProvider({ children }: TarotProviderProps) {
  const [search, setSearch] = useState<string>("");
  const [cardList, setCardList] = useState<CardList[]>([]);
  const [allCard, setAllCard] = useState<CardList[]>([]); //การ์ดตั้งต้นทั้งหมดใช้ในหน้า tarotdeck
  const [originSearchCardList, setSearchOriginCardList] = useState<CardList[]>(
    []
  );
  const [cardDetail, setCardDetail] = useState<CardList | undefined>(undefined);
  const [selectNameCard, setSelectNameCard] = useState<string>("");
  const [selectIndexType, setSelectIndexType] = useState<string | undefined>(
    undefined
  );
  const [selectIndexSuit, setSelectIndexSuit] = useState<string>("");

  const fetchSearchResults = async (input: string) => {
    const apiSearch = `https://tarotapi.dev/api/v1/cards/search?q=${input}`;
    try {
      const response = await axios.get(apiSearch);
      // console.log(apiSearch);
      console.log(response.data.cards);
      setCardList(response.data.cards);
      setSearchOriginCardList(response.data.cards);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCards = async () => {
    try {
      const response = await axios.get(`https://tarotapi.dev/api/v1/cards/`);
      setAllCard(response.data.cards);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, []);

  const handleFilterType = (selectType: string) => {
    const resType = originSearchCardList.filter(
      (item) => item.type.toLowerCase() === selectType.toLowerCase()
    );
    setCardList(resType);
  };
  const handleFilterSuit = (selectSuit: string) => {
    const resType = originSearchCardList.filter(
      (item) => item.suit !== "" && item.suit === selectSuit
    );
    setCardList(resType);
  };

  const getIndexType = (index: string) => {
    setSelectIndexType(index);
  };
  const getIndexSuit = (index: string) => {
    setSelectIndexSuit(index);
  };
  const sortAZ = () => {
    const resType = [...originSearchCardList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCardList(resType);
    console.log("a-z");
  };

  const sortZA = () => {
    const resType = [...originSearchCardList].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setCardList(resType);
    console.log("z-a");
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
      }}
    >
      {children}
    </TarotContext.Provider>
  );
}
