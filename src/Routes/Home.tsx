import { useQuery } from "react-query";
import {
  getAnime,
  getAnimeInfo,
  getAnimeChara,
  IAnime,
  getAiringAnime,
  getTopAnime,
  IChara,
} from "../api";
import styled from "styled-components";
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import { connect } from "react-redux";
import { baanerId, images } from "../images";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useInterval from "../components/useInterval";
import { useNavigate } from "react-router-dom";
import { setAnimeInfo } from "../redux/action";
const mapStateToProps = (state: { anmieInfo: any; aniList: any }) => {
  return {
    aniList: state.aniList,
    anmieInfo: state.anmieInfo,
  };
};
const mapDispatchToProps = (
  dispatch: (arg0: { type: string; data: number }) => object
) => {
  return {
    setAnimeInfo: (anmieInfo: number) => dispatch(setAnimeInfo(anmieInfo)),
  };
};
const Wrapper = styled.div``;
const Banner = styled(motion.div)<{ bgphoto: string }>`
  display: flex;
  align-items: center;
  height: 80vh;
  padding: 60px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
`;

const BannerWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  border: 1px solid white;
`;
const SlideBtn = styled.div`
  background-color: aliceblue;
  svg {
    height: 30px;
    cursor: pointer;
    position: absolute;
    margin: 0px 30px;
  }
  svg:first-child {
    left: 0;
  }
  svg:last-child {
    right: 0;
  }
`;
const BannerClickCom = styled.div`
  cursor: pointer;
  height: 60vh;
  width: 80vw;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 100px;
`;
function App({ anmieInfo, setAnimeInfo }: any) {
  const [index, setIndex] = useState<number>(1);
  const [image, setImage] = useState<string>(images[0]);
  const [imageId, setImageId] = useState<number>(baanerId[0]);
  const [timer, setTimer] = useState<number>(8000);

  const { data: animes, isLoading } = useQuery<IAnime>("animes", getAnime);
  const { data: aring, isLoading: al } = useQuery<IAnime>(
    "airinganimes",
    getAiringAnime
  );
  const { data: topAnime, isLoading: tl } = useQuery<IAnime>(
    "topanime",
    getTopAnime
  );

  const info = anmieInfo;
  const { data: animeInfos } = useQuery<IAnime>(
    info ? ["animeinfo", info] : "",
    () => info && getAnimeInfo(info ? info : "")
  );
  const { data: animeVoices } = useQuery<IChara>(
    info ? ["animevocie", info] : "",
    () => info && getAnimeChara(info ? info : "")
  );
  const bannerClick = () => {
    if (index === 2) setIndex(0);
    else setIndex(index + 1);
    setImage(images[index]);
    setImageId(baanerId[index]);
    setTimer(8000);
  };
  const bannerBackClick = () => {
    if (index === 0) setIndex(2);
    else setIndex(index - 1);
    setImage(images[index]);
    setImageId(baanerId[index]);
    setTimer(8000);
  };
  useInterval(() => {
    bannerClick();
  }, timer);
  const box = {
    entry: { opacity: 0.5 },
    center: { opacity: 1 },
  };

  const navigate = useNavigate();
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}/banner`);
    setAnimeInfo(animeId);
  };
  return (
    <Wrapper>
      {isLoading && al && tl ? (
        <div>Loading...</div>
      ) : (
        <>
          <AnimatePresence>
            <BannerClickCom
              onClick={() => onBoxClicked(imageId)}
            ></BannerClickCom>
            <Banner
              key={index}
              variants={box}
              initial="entry"
              animate="center"
              transition={{ duration: 1 }}
              bgphoto={image}
            >
              <BannerWrap>
                <SlideBtn>
                  <svg
                    onClick={bannerBackClick}
                    fill="white"
                    viewBox="0 0 256 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    onClick={bannerClick}
                    fill="white"
                    viewBox="0 0 256 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                    />
                  </svg>
                </SlideBtn>
              </BannerWrap>
            </Banner>
          </AnimatePresence>
          <div style={{ padding: "20px" }}>
            <Slider data={aring?.data} title="放送中のアニメ"></Slider>
            <Slider data={topAnime?.data} title="人気のアニメ"></Slider>
            <Slider data={animes?.data} title={"アニメ"}></Slider>
          </div>
          <Modal info={animeInfos} voice={animeVoices}></Modal>
        </>
      )}
    </Wrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
