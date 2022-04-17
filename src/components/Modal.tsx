/* eslint-disable no-restricted-globals */
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { anmieInfo } from "../atoms";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

const AnimeInfo = styled(motion.div)`
  position: absolute;
  width: 1080px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow-y: scroll;
  background-color: #0a1622;
`;

const Iframe = styled.iframe`
  border: 1px solid white;
`;

const ModalWrap = styled.div`
  color: white;
`;
const Banner = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), #0a1622),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;
const BannerTitle = styled.div`
  font-size: 38px;
  font-weight: 500;
`;

const Rank = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 28px;
  font-weight: 500;
  color: red;
`;

const Title = styled.div``;
function Modal({ info, voice }: any) {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const bigAnimeMatch: PathMatch<string> | null = useMatch("/animes/:id");
  const onOverlayClick = () => {
    navigate("/");
    document.body.style.overflow = "unset";
  };
  const data = useRecoilValue(anmieInfo);
  const clickedAnime =
    bigAnimeMatch?.params.id && String(data) === bigAnimeMatch.params.id;
  if (clickedAnime) {
    document.body.style.overflow = "hidden";
  }
  //   console.log(voice.data[0].character.name);
  return (
    <AnimatePresence>
      {bigAnimeMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <AnimeInfo
            layoutId={bigAnimeMatch.params.id}
            style={{ top: scrollY.get() + 80 }}
          >
            {clickedAnime && info && voice && (
              <ModalWrap>
                <Banner bgphoto={info.data.trailer.images.large_image_url}>
                  <Rank>Rank #{info.data.rank}</Rank>
                  <BannerTitle>
                    <Title>{info.data.title}</Title>
                  </BannerTitle>
                  <Iframe
                    width="535"
                    height="300"
                    src={info.data.trailer.embed_url}
                  ></Iframe>
                </Banner>

                <div>{info.data.rating}</div>
                <div>Synopsis: {info.data.synopsis}</div>
                <div>
                  <div>Status{info.data.status}</div>
                  <div>Format{info.data.type}</div>
                  <div>Genre{info.data.genres[0].name}</div>
                  <div>Duration{info.data.duration}</div>
                  <div>Source{info.data.source}</div>
                  <div>Popularity{info.data.popularity}</div>
                  <div>Favorites{info.data.favorites}</div>
                  <div>Studios{info.data.studios[0].name}</div>
                </div>
                <div>
                  {voice?.data.map((voice: any) => (
                    <div style={{ color: "red" }}>{voice.character.name}</div>
                  ))}
                </div>
                {/* [0].character.name */}
              </ModalWrap>
            )}
          </AnimeInfo>
        </>
      ) : null}
    </AnimatePresence>
  );
}
export default Modal;
