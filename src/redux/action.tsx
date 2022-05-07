export const setDogs = (dog: any) => ({
  type: "SET_DOGS",
  payload: dog,
});

export const setAnimeLists = (anilist: any) => ({
  type: "SET_ANIMELIST",
  list: anilist,
});

export const setAnimeInfo = (aniinfo: any) => ({
  type: "SET_ANIMEINFO",
  data: aniinfo,
});

export const setAnimeSearch = (aniserch: any) => ({
  type: "SET_ANIMESERACH",
  data: aniserch,
});
