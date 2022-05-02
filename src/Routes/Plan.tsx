import { Navigate, PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { animeList, anmieInfo } from "../atoms";
import Modal from "../components/Modal";

const Wrap = styled.div`
  height: 100%;
  margin-top: 65px;
  background-color: #152232;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
`;
const Header = styled.h1`
  font-size: 34px;
  font-weight: 400;
`;
const BoxWarp = styled.div``;

const Box = styled.div<{ bgphoto: string }>`
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
  margin: 20px;
  h4 {
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 100%;
    font-size: 18px;
    font-weight: 600px;
    color: white;
  }
`;
function Plan() {
  const animeLists = useRecoilValue<any>(animeList);
  const setAnimeData = useSetRecoilState(anmieInfo);
  const navigate = useNavigate();
  const bigAnimeMatch: PathMatch<string> | null =
    useMatch("/animes/:id/:title");
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}/plan`);
    setAnimeData(animeId);
  };
  return (
    <Wrap>
      <Header>My List</Header>
      <Main>
        {animeLists.map((anime: any) => (
          <BoxWarp key={anime.data.mal_id}>
            <Box
              onClick={() => onBoxClicked(anime.data.mal_id)}
              bgphoto={anime.data.images.jpg.image_url}
            >
              <h4>{anime.data.title}</h4>
            </Box>
          </BoxWarp>
        ))}
      </Main>
    </Wrap>
  );
}
export default Plan;
