import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  height: 225px;
  width: 150px;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 10px;
  border: 1px solid white;
  margin: 5px;
  h4 {
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-weight: 600px;
    color: white;
  }
`;

const Sliders = styled.div``;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;

  overflow: hidden;
`;
const AniContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderWrap = styled.div`
  background-color: #152232;
  margin: 20px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
`;

const ListName = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const SlideBtn = styled.div`
  color: white;
  svg {
    height: 25px;
    margin-left: 30px;
    cursor: pointer;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 1080px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: #152232;
`;

function Slider({ data, title }: any) {
  const bigMovieMatch: PathMatch<string> | null = useMatch("/animes/:id");
  const [index, setIndex] = useState(0);
  const { scrollY } = useViewportScroll();
  const incraseIndex = (val: string) => {
    if (val === "add") {
      const totalAnimes = data?.data.length;
      const maxIndex = Math.floor(totalAnimes / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    if (val === "min") {
      setIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };
  const offset = 8;
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}`);
  };
  const onOverlayClick = () => navigate("/");
  return (
    <SliderWrap>
      <ListName>
        <div>{title}</div>
        <SlideBtn>
          <svg
            onClick={() => incraseIndex("min")}
            fill="currentColor"
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
            onClick={() => incraseIndex("add")}
            fill="currentColor"
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
            />
          </svg>
        </SlideBtn>
      </ListName>
      <Sliders>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row key={index}>
            {data?.data
              .slice(offset * index, offset * index + offset)
              .map((anime: any) => (
                <AniContents key={anime.mal_id}>
                  <Box
                    layoutId={anime.mal_id}
                    onClick={() => onBoxClicked(anime.mal_id)}
                    whileHover="hover"
                    initial="normal"
                    transition={{ type: "tween" }}
                    bgPhoto={anime.images.jpg.image_url}
                  >
                    <h4>{anime.title}</h4>
                  </Box>
                </AniContents>
              ))}
          </Row>
        </AnimatePresence>
      </Sliders>
      <AnimatePresence></AnimatePresence>
    </SliderWrap>
  );
}
export default Slider;
