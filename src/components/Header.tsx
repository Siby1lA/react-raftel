import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAnimeSearch } from "../api";
import SearchList from "./SearchList";
import { Link } from "react-router-dom";
import { setAnimeSearch } from "../redux/action";
import { connect } from "react-redux";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  height: 65px;
  color: white;
  z-index: 1;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.h3)`
  cursor: pointer;
  margin-right: 50px;
  font-size: 25px;
  font-weight: 400;
  color: white;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  width: 280px;
  height: 35px;
  position: absolute;
  right: 0px;
  padding: 5px 0px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: #0a1622;
  border-radius: 5px;
  border: none;
`;

const List = styled(motion.div)`
  position: absolute;
  right: 0;
  margin-right: 60px;
  top: 53px;
  background-color: #152232;
  width: 280px;
  height: 300px;
`;

const SearchTyping = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 52px;
  margin-right: 60px;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "#0A1622",
  },
};
const mapStateToProps = (state: { animeSearch: string }) => {
  return {
    animeSearch: state.animeSearch,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; data: string }) => object
) => {
  return {
    setAnimeSearch: (animeSearch: string) =>
      dispatch(setAnimeSearch(animeSearch)),
  };
};
function Header({ animeSearch, setAnimeSearch }: any) {
  const infoSearch = animeSearch;
  const { data: animeSearchs } = useQuery(
    infoSearch ? ["animeserach", infoSearch] : "",
    () => infoSearch && getAnimeSearch(infoSearch ? infoSearch : "")
  );
  const [searchOpen, setSerachOpen] = useState(false);
  const { scrollY } = useViewportScroll();
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const ListAnimation = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimeSearch(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // const onBlur = (e: any) => {
  //   setAnimeData("");
  // };
  const toggleSearch = () => {
    if (searchOpen) {
      // trigger the close animation
      ListAnimation.start({
        scaleX: 0,
      });
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      // trigger the open animation
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSerachOpen((prev) => !prev);
  };
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Link to="/">
          <Logo>RAFTEL</Logo>
        </Link>
        <Items>
          <Item>Chara</Item>
          <Item>Song</Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={onSubmit}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -245 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            onChange={onChange}
            // onBlur={onBlur}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for Animation"
            autoComplete="off"
          />
        </Search>
        <List
          animate={ListAnimation}
          initial={{ scaleX: 0 }}
          transition={{ type: "linear" }}
        ></List>
        {animeSearchs ? (
          <SearchTyping>
            <SearchList data={animeSearchs}></SearchList>
          </SearchTyping>
        ) : null}
      </Col>
    </Nav>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
