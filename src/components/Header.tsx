import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.h3)`
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

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "#0A1622",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSerachOpen] = useState(false);
  const { scrollY } = useViewportScroll();
  const navigate = useNavigate();
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    navigate(`/search?keyword=${data.keyword}`);
  };

  const toggleSearch = () => {
    if (searchOpen) {
      // trigger the close animation
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
        <Logo>RAFTEL</Logo>

        <Items>
          <Item>Chara</Item>
          <Item>Song</Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
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
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for Animation"
          />
        </Search>
      </Col>
    </Nav>
  );
}
export default Header;
