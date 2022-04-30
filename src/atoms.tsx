import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "MyList",
  storage: localStorage,
});
export const anmieInfo = atom({
  key: "anime",
  default: 0,
});

export const animeSearch = atom({
  key: "animeSearch",
  default: "",
});

export const animeList = atom<any>({
  key: "data",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
