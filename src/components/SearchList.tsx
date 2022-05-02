import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { anmieInfo } from "../atoms";

const ListWrap = styled.div`
  background-color: #152232;
  width: 280px;
  height: 400px;
  overflow-y: scroll;
  padding: 10px;
`;

const BoxWrap = styled.div`
  display: flex;
`;

const Disc = styled.div`
  margin: 10px;
  color: white;
  width: 150px;
  height: 100px;
  cursor: pointer;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  width: 75px;
  height: 100px;
  border-radius: 5px;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
`;

function SearchList({ data }: any) {
  const navigate = useNavigate();
  const setAnimeData = useSetRecoilState(anmieInfo);
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}/search`);
    setAnimeData(animeId);
  };
  return (
    <ListWrap>
      {data?.data &&
        data?.data.map((anime: any) => (
          <BoxWrap
            key={anime.mal_id}
            onClick={() => onBoxClicked(anime.mal_id)}
          >
            <Box bgphoto={anime.images.jpg.image_url}></Box>
            <Disc>{anime.title}</Disc>
          </BoxWrap>
        ))}
    </ListWrap>
  );
}
export default SearchList;
