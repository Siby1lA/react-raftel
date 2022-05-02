import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { anmieInfo } from "../atoms";

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
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
  position: absolute;
  width: 100%;
`;

const SliderWrap = styled.div`
  background-color: #152232;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
  height: 300px;
  overflow: hidden;
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

const box = {
  entry: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  center: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

function Slider({ data, title }: any) {
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const incraseIndex = (val: string) => {
    if (val === "add") {
      setBack(false);
      const totalAnimes = data?.data.length;
      const maxIndex = Math.floor(totalAnimes / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    if (val === "min") {
      setBack(true);
      setIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };
  const offset = 8;
  const navigate = useNavigate();
  const setAnimeData = useSetRecoilState(anmieInfo);
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}/${title}`);
    setAnimeData(animeId);
  };
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
        <AnimatePresence>
          <Row
            key={index}
            custom={back}
            variants={box}
            initial="entry"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 1.5 }}
          >
            {data?.data &&
              data?.data
                .slice(offset * index, offset * index + offset)
                .map((anime: any) => (
                  <Box
                    //같은 애니가 나올시 레이아웃아이디 겹침..
                    layoutId={anime.mal_id + title}
                    key={anime.mal_id}
                    onClick={() => onBoxClicked(anime.mal_id)}
                    bgphoto={anime.images.jpg.image_url}
                  >
                    <h4>{anime.title_japanese}</h4>
                  </Box>
                ))}
          </Row>
        </AnimatePresence>
      </Sliders>
    </SliderWrap>
  );
}
export default Slider;
