import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { tarotCardImages } from "../components/TarotCardImages";

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
  // fetchCards: Promise<void>;
  handleType: (selectType: string) => void;
  handleSuit: (selectSuit: string, index: number) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cardList: CardList[];
  allCard: CardList[];
  activeType: boolean;
  activeSuit: boolean;
  tarotCardGallery: typeof tarotCardImages;
  cardDetail: CardList | undefined;
  selectNameCard: string;
  setSelectNameCard: React.Dispatch<React.SetStateAction<string>>;
  setCardDetail: React.Dispatch<React.SetStateAction<CardList | undefined>>;
  getImage: (nameImage: string) => string; //ส่งคืนกลับมาเป็นชื่อภาพ
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
  const [originCardList, setOriginCardList] = useState<CardList[]>([]);
  const [activeType, setActiveType] = useState<boolean>(false);
  const [activeSuit, setActiveSuit] = useState<boolean>(false);
  const [cardDetail, setCardDetail] = useState<CardList | undefined>(undefined);
  const [selectNameCard, setSelectNameCard] = useState<string>("");

  const fetchSearchResults = async (input: string) => {
    const apiSearch = `https://tarotapi.dev/api/v1/cards/search?q=${input}`;
    try {
      const response = await axios.get(apiSearch);
      // console.log(apiSearch);
      console.log(response.data.cards);
      setCardList(response.data.cards);
      setOriginCardList(response.data.cards);
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

  const handleType = (selectType: string) => {
    setActiveType((prev) => !prev);
    if (activeType) {
      const resType = originCardList.filter(
        (item) => item.type.toLowerCase() === selectType.toLowerCase()
      );
      setCardList(resType);
    } else {
      setCardList(originCardList);
    }
  };
  const handleSuit = (selectSuit: string, index: number) => {
    setActiveSuit((prev) => !prev);
    console.log(index);
    if (activeSuit) {
      const resSuit: CardList[] = originCardList.filter(
        (item) => item.suit.toLowerCase() === selectSuit.toLowerCase()
      );
      setCardList(resSuit);
    } else {
      setCardList(originCardList);
    }
  };
  useEffect(() => {
    console.log("change");
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
        handleType,
        handleSuit,
        activeType,
        activeSuit,
        allCard,
        cardDetail,
        selectNameCard,
        setSelectNameCard,
        setCardDetail,
        getImage,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
}
