const BASE_PATH = "https://api.jikan.moe/v4";

export interface IAnime {
  data: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    trailer: {
      youtube_id: string;
      url: string;
      embed_url: string;
    };
    title: string;
    title_english: string;
    title_japanese: string;
  };
}

export interface IChara {
  data: {
    character: {
      images: {
        jpg: {
          image_url: string;
          small_image_url: string;
        };
        webp: {
          image_url: string;
          small_image_url: string;
        };
      };
      mal_id: number;
      name: string;
      url: string;
    };
    voice_actors: [
      {
        person: {
          mal_id: number;
          url: string;
          images: {
            jpg: {
              image_url: string;
            };
          };
          name: string;
        };
        language: string;
      }
    ];
  };
}

export interface IGetCharaResult {
  data: [IChara];
}

export interface IGetAnimeResult {
  data: [IAnime];
}

export function getAnime() {
  return fetch(`${BASE_PATH}/anime`).then((response) => response.json());
}

export function getAnimeInfo(animeId: string) {
  return fetch(`${BASE_PATH}/anime/${animeId}`).then((response) =>
    response.json()
  );
}

export function getTopAnime() {
  return fetch(`${BASE_PATH}/top/anime`).then((response) => response.json());
}

export function getAiringAnime() {
  return fetch(`${BASE_PATH}/seasons/now`).then((response) => response.json());
}

export function getBannerAnime() {
  return fetch(`${BASE_PATH}/anime/38000`).then((response) => response.json());
}

export function getAnimeChara(animeId: string) {
  return fetch(`${BASE_PATH}/anime/${animeId}/characters`).then((response) =>
    response.json()
  );
}
