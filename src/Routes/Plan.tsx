import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAnimeInfo } from "../redux/action";
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
const mapStateToProps = (state: { anmieInfo: any; aniList: any }) => {
  return {
    aniList: state.aniList,
    anmieInfo: state.anmieInfo,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; data: any }) => any
) => {
  return {
    setAnimeInfo: (anmieInfo: any) => dispatch(setAnimeInfo(anmieInfo)),
  };
};
function Plan({ aniList, setAnimeInfo }: any) {
  const navigate = useNavigate();
  const onBoxClicked = (animeId: number) => {
    navigate(`/animes/${animeId}/plan`);
    setAnimeInfo(animeId);
  };
  return (
    <Wrap>
      <Header>My List</Header>
      <Main>
        {aniList?.map((anime: any) => (
          <BoxWarp key={anime.mal_id}>
            <Box
              onClick={() => onBoxClicked(anime.mal_id)}
              bgphoto={anime.images.jpg.image_url}
            >
              <h4>{anime.title_japanese}</h4>
            </Box>
          </BoxWarp>
        ))}
      </Main>
    </Wrap>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Plan);
