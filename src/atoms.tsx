import { atom } from "recoil";

export const anmieInfo = atom({
  key: "anime",
  default: 0,
});

export const animeSearch = atom({
  key: "animeSearch",
  default: "",
});
