import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { anmieInfo } from "../atoms";
import { animeList } from "../atoms";
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

const ModalPoster = styled(motion.div)<{ bgphoto: string }>`
  height: 260px;
  width: 190px;
  border-radius: 10px;
  border: 5px solid #152232;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
`;

const ListBtn = styled.div`
  background-color: tomato;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  font-weight: 400;
  &:hover {
    color: #152232;
    cursor: pointer;
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 20px;
`;
const ValueList = styled.div`
  background-color: #152232;
  padding: 25px;
  height: fit-content;
  border-radius: 10px;
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

const Header = styled.div``;
let val: any = [];
function Modal({ info, voice }: any) {
  const [listBtn, setListBtn] = useState("Add To List");
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const bigAnimeMatch: PathMatch<string> | null =
    useMatch("/animes/:id/:title");
  let titles: any = bigAnimeMatch?.params.title;
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

  const AnimeList = useRecoilState(animeList);
  const setAnimeList = useSetRecoilState(animeList);
  const AnimeListArray = () => {
    for (let i = 0; i < AnimeList[0].length; i++) {
      val.push(AnimeList[0][i].data.mal_id);
    }
  };
  const AddList = ({ data }: any) => {
    AnimeListArray();
    if (val.includes(data.mal_id)) {
    } else {
      setListBtn("Watching");
      setAnimeList((oldData: any) => [{ data }, ...oldData]);
    }
  };
  useEffect(() => {
    AnimeListArray();
    if (clickedAnime) {
      if (val.includes(Number(bigAnimeMatch?.params.id)))
        setListBtn("Watching");
      else setListBtn("Add To List");
    }
  }, [clickedAnime]);
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
            style={{ top: scrollY.get() + 80 }}
            layoutId={bigAnimeMatch.params.id + titles}
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
                    <ModalPoster bgphoto={info.data.images.jpg.image_url}>
                      <ListBtn onClick={() => AddList(info)}>{listBtn}</ListBtn>
                    </ModalPoster>

                    <ValueList>
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
                    </ValueList>
                  </LeftContents>

                  <RightContes>
                    <Header>
                      <div>
                        <Rank>Rank #{info.data.rank}</Rank>
                        <Rank>{info.data.rating}</Rank>
                      </div>
                    </Header>

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
