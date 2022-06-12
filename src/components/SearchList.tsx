import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAnimeInfo } from "../redux/action";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}/search`);
    dispatch(setAnimeInfo(animeId));
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
            <Disc>{anime.title_japanese}</Disc>
          </BoxWrap>
        ))}
    </ListWrap>
  );
}
export default SearchList;
