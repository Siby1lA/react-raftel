/* eslint-disable no-restricted-globals */
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { anmieInfo } from "../atoms";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

const AnimeInfo = styled(motion.div)`
  position: absolute;
  width: 80vw;
  height: 85vh;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const CharaImg = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  height: 225px;
  width: 160px;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  border: 2px solid white;
  margin: 10px;
`;

const AnimeContent = styled.div`
  display: flex;
  padding: 30px;
`;

const LeftContents = styled.div`
  background-color: #152232;
  padding: 25px;
  height: fit-content;
  border-radius: 10px;
  margin-right: 15px;
  margin-bottom: 20px;
  div {
    margin-bottom: 10px;
    width: 150px;
  }
  span {
    font-weight: 400;
  }
`;

const RightContes = styled.div`
  width: 80vw;
`;

const Rank = styled.div`
  font-size: 16px;
  :first-child {
    color: red;
    font-weight: 400;
    font-size: 18px;
  }
`;

const Title = styled.h2`
  margin: 15px 0px;
  font-size: 30px;
  font-weight: 400;
`;

const Synopsis = styled.div`
  h3 {
    font-weight: 400;
    font-size: 22px;
  }
`;
const CharaVoice = styled.h3`
  margin-top: 15px;
  font-weight: 400;
  font-size: 22px;
`;
const Chara = styled.div``;

const Charas = styled.div`
  background-color: #152232;
  margin: 15px;
  padding: 10px;
  border-radius: 10px;
`;

const CharaImgWrap = styled.div`
  display: flex;
  justify-content: space-around;
  color: white;
`;

const CharaName = styled.div`
  display: flex;
  justify-content: space-around;
  color: white;
`;

function Modal({ info, voice }: any) {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const bigAnimeMatch: PathMatch<string> | null = useMatch("/animes/:id");

  const onOverlayClick = () => {
    navigate("/");
    document.body.style.overflow = "unset";
  };
  const data = useRecoilValue(anmieInfo);
  // 검색해서 클릭한것도 추가해야함
  const clickedAnime =
    bigAnimeMatch?.params.id && String(data) === bigAnimeMatch.params.id;

  if (clickedAnime) {
    document.body.style.overflow = "hidden";
  }
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
            // layoutId={bigAnimeMatch.params.id}
            style={{ top: scrollY.get() + 80 }}
          >
            {clickedAnime && info && voice && (
              <ModalWrap>
                <Banner
                  bgphoto={
                    info.data.trailer
                      ? info.data.trailer.images.large_image_url
                      : ""
                  }
                >
                  <Iframe
                    width="690"
                    height="390"
                    src={info.data.trailer ? info.data.trailer.embed_url : ""}
                  ></Iframe>
                </Banner>
                <AnimeContent>
                  <LeftContents>
                    <div>
                      <div>
                        ⭐️ Score:
                        <span> {info.data.score}</span>
                      </div>
                      <div>
                        ❤️ Popularity:
                        <span> {info.data.popularity}</span>
                      </div>
                      <div>
                        Status
                        <br />
                        <span>{info.data.status}</span>
                      </div>
                      <div>
                        Format
                        <br />
                        <span>{info.data.type}</span>
                      </div>
                      <div>
                        Genre
                        <br />
                        <span>
                          {info.data.genres[0] && info.data.genres[0].name}
                        </span>
                      </div>
                      <div>
                        Duration
                        <br />
                        <span>{info.data.duration}</span>
                      </div>
                      <div>
                        Source
                        <br />
                        <span>{info.data.source}</span>
                      </div>
                      <div>
                        Favorites
                        <br />
                        <span>{info.data.favorites}</span>
                      </div>
                      <div style={{ marginBottom: "-10px" }}>
                        Studio
                        <br />
                        <span>
                          {info.data.studios[0] && info.data.studios[0].name}
                        </span>
                      </div>
                    </div>
                  </LeftContents>

                  <RightContes>
                    <Rank>Rank #{info.data.rank}</Rank>
                    <Rank>{info.data.rating}</Rank>
                    <Title>{info.data.title}</Title>

                    <Synopsis>
                      <h3>Synopsis:</h3>
                      <span>{info.data.synopsis}</span>
                    </Synopsis>

                    <CharaVoice>Chara</CharaVoice>
                    <Chara>
                      {voice?.data &&
                        voice?.data.map((voice: any) => (
                          <Charas key={voice.character.mal_id}>
                            <CharaImgWrap>
                              <CharaImg
                                bgphoto={voice.character.images.jpg.image_url}
                              ></CharaImg>
                              <CharaImg
                                bgphoto={
                                  voice.voice_actors[0] &&
                                  voice.voice_actors[0].person.images.jpg
                                    .image_url
                                }
                              ></CharaImg>
                            </CharaImgWrap>

                            <CharaName>
                              <div>{voice.character.name}</div>
                              <div>
                                {voice.voice_actors[0] &&
                                  voice.voice_actors[0].person.name}
                              </div>
                              {/* {voice.role} */}
                            </CharaName>
                          </Charas>
                        ))}
                    </Chara>
                  </RightContes>
                </AnimeContent>
              </ModalWrap>
            )}
          </AnimeInfo>
        </>
      ) : null}
    </AnimatePresence>
  );
}
export default Modal;
