import { useQuery } from "react-query";
import {
  getAnime,
  getAnimeInfo,
  getAnimeChara,
  getBannerAnime,
  IGetAnimeResult,
  IGetCharaResult,
  IAnime,
  getAiringAnime,
  getTopAnime,
} from "../api";
import styled from "styled-components";
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import { anmieInfo } from "../atoms";
import { useRecoilValue } from "recoil";
const Wrapper = styled.div``;
const Banner = styled.div<{ bgphoto: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), #0a1622),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const BannerWrap = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 20px;
`;
const Iframe = styled.iframe`
  border: 1px solid white;
`;

function App() {
  const { data: animes, isLoading } = useQuery<IGetAnimeResult>(
    "animes",
    getAnime
  );
  const { data: aring, isLoading: al } = useQuery<IGetAnimeResult>(
    "airinganimes",
    getAiringAnime
  );
  const { data: topAnime, isLoading: tl } = useQuery<IGetAnimeResult>(
    "topanime",
    getTopAnime
  );
  const { data: bannerAnime, isLoading: bl } = useQuery(
    "banneranime",
    getBannerAnime
  );
  const info = useRecoilValue<any>(anmieInfo);
  const { data: animeInfos } = useQuery<IAnime>(
    info ? ["animeinfo", info] : "",
    () => info && getAnimeInfo(info ? info : "")
  );
  const { data: animeVoices } = useQuery<IGetCharaResult>(
    info ? ["animevocie", info] : "",
    () => info && getAnimeChara(info ? info : "")
  );
  return (
    <Wrapper>
      {isLoading && bl && al ? (
        <div>Loading...</div>
      ) : (
        <>
          <Banner
            bgphoto={
              "https://image.api.playstation.com/vulcan/ap/rnd/202106/1112/WvnvSUm2jwosrZa0ZP30I4F2.jpg"
            }
          >
            <BannerWrap>
              <Iframe
                width="690"
                height="390"
                src={bannerAnime ? bannerAnime.data.trailer.embed_url : ""}
              ></Iframe>
            </BannerWrap>
          </Banner>
          <div style={{ padding: "20px" }}>
            <Slider data={aring} title="放送中のアニメ"></Slider>
            <Slider data={topAnime} title="人気のアニメ"></Slider>
            <Slider data={animes} title="アニメ"></Slider>
          </div>
          <Modal info={animeInfos} voice={animeVoices}></Modal>
        </>
      )}
    </Wrapper>
  );
}

export default App;
