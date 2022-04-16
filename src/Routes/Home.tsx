/* eslint-disable jsx-a11y/iframe-has-title */
import { useQuery } from "react-query";
import { getAnime, getBannerAnime, getTopAnime, IGetAnimeResult } from "../api";
import styled from "styled-components";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  height: 100%;
`;
const Banner = styled.div<{ bgphoto: string }>`
  display: flex;
  align-items: center;
  height: 70vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), #0a1622),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const BannerTitle = styled.div`
  color: white;
  font-size: 38px;
`;

const BannerWrap = styled.div`
  margin-left: 30px;
`;
const Iframe = styled.iframe`
  border: 1px solid white;
`;

function App() {
  const { data: animes, isLoading } = useQuery<IGetAnimeResult>(
    "animes",
    getAnime
  );
  const { data: topAnime, isLoading: tl } = useQuery<IGetAnimeResult>(
    "topanime",
    getTopAnime
  );
  const { data: bannerAnime, isLoading: bl } = useQuery(
    "banneranime",
    getBannerAnime
  );

  return (
    <Wrapper>
      {isLoading && tl && bl ? (
        <div>Loading...</div>
      ) : (
        <>
          <Banner
            bgphoto={
              "https://image.api.playstation.com/vulcan/ap/rnd/202106/1112/WvnvSUm2jwosrZa0ZP30I4F2.jpg"
            }
          >
            <BannerWrap>
              <BannerTitle>{bannerAnime.data.title}</BannerTitle>
              <Iframe
                width="690"
                height="390"
                src={bannerAnime.data.trailer.embed_url}
              ></Iframe>
            </BannerWrap>
          </Banner>
          <div style={{ padding: "20px" }}>
            <Slider data={animes} title="Animes"></Slider>
            <Slider data={topAnime} title="Top Animes"></Slider>
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default App;
