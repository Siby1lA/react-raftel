const BASE_PATH = "https://api.jikan.moe/v4";

export interface IGetAnimeResult {
  data: [
    {
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
    }
  ];
}

export function getAnime() {
  return fetch(`${BASE_PATH}/anime`).then((response) => response.json());
}

export function getTopAnime() {
  return fetch(`${BASE_PATH}/top/anime`).then((response) => response.json());
}

export function getRandomAnime() {
  return fetch(`${BASE_PATH}/random/anime`).then((response) => response.json());
}

export function getBannerAnime() {
  return fetch(`${BASE_PATH}/anime/38000`).then((response) => response.json());
}
