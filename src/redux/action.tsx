export const setAnimeLists = (anilist: Object) => ({
  type: "SET_ANIMELIST",
  list: anilist,
});

export const setAnimeInfo = (aniinfo: number) => ({
  type: "SET_ANIMEINFO",
  data: aniinfo,
});

export const setAnimeSearch = (aniserch: string) => ({
  type: "SET_ANIMESERACH",
  data: aniserch,
});

export const setUserInfo = (userinfo: any) => ({
  type: "SET_USERINFO",
  data: userinfo,
});
