import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Wrap = styled.div``;

const Svg = styled(motion.svg)`
  background-color: #152232;
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 30px;
  border-radius: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
`;

const NavList = styled(motion.div)`
  background-color: #152232;
  width: 200px;
  height: 65px;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 5px;
  margin: 30px;
  border-radius: 10px;
  border: 1px solid white;
`;
const ListWrap = styled(motion.div)`
  position: relative;
`;
const ExitBtn = styled.div`
  width: 20px;
  position: absolute;
  right: 0;
`;
const Icon = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Icons = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 13px;
    margin-top: 5px;
  }
`;
function Nav() {
  const [id, setId] = useState<null | string>(null);

  return (
    <Wrap>
      <Svg
        layoutId={"a"}
        onClick={() => setId("1")}
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
      </Svg>
      <AnimatePresence>
        {id ? (
          <NavList layoutId={"a"}>
            <ListWrap>
              <ExitBtn>
                <svg
                  onClick={() => setId(null)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="white"
                >
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </ExitBtn>
              <Icon>
                <Link to="Plan">
                  <Icons>
                    <svg
                      style={{ width: "30px" }}
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z" />
                    </svg>
                    <span>Plan To Watch</span>
                  </Icons>
                </Link>
                <Icons>
                  <svg
                    style={{ width: "40px" }}
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M425.1 482.6c-2.303-1.25-4.572-2.559-6.809-3.93l-7.818 4.493c-6.002 3.504-12.83 5.352-19.75 5.352c-10.71 0-21.13-4.492-28.97-12.75c-18.41-20.09-32.29-44.15-40.22-69.9c-5.352-18.06 2.343-36.87 17.83-45.24l8.018-4.669c-.0664-2.621-.0664-5.242 0-7.859l-7.655-4.461c-12.3-6.953-19.4-19.66-19.64-33.38C305.6 306.3 290.4 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512H413.3c5.727 0 10.9-1.727 15.66-4.188c-2.271-4.984-3.86-10.3-3.86-16.06V482.6zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM610.5 373.3c2.625-14 2.625-28.5 0-42.5l25.75-15c3-1.625 4.375-5.125 3.375-8.5c-6.75-21.5-18.25-41.13-33.25-57.38c-2.25-2.5-6-3.125-9-1.375l-25.75 14.88c-10.88-9.25-23.38-16.5-36.88-21.25V212.3c0-3.375-2.5-6.375-5.75-7c-22.25-5-45-4.875-66.25 0c-3.25 .625-5.625 3.625-5.625 7v29.88c-13.5 4.75-26 12-36.88 21.25L394.4 248.5c-2.875-1.75-6.625-1.125-9 1.375c-15 16.25-26.5 35.88-33.13 57.38c-1 3.375 .3751 6.875 3.25 8.5l25.75 15c-2.5 14-2.5 28.5 0 42.5l-25.75 15c-3 1.625-4.25 5.125-3.25 8.5c6.625 21.5 18.13 41 33.13 57.38c2.375 2.5 6 3.125 9 1.375l25.88-14.88c10.88 9.25 23.38 16.5 36.88 21.25v29.88c0 3.375 2.375 6.375 5.625 7c22.38 5 45 4.875 66.25 0c3.25-.625 5.75-3.625 5.75-7v-29.88c13.5-4.75 26-12 36.88-21.25l25.75 14.88c2.875 1.75 6.75 1.125 9-1.375c15-16.25 26.5-35.88 33.25-57.38c1-3.375-.3751-6.875-3.375-8.5L610.5 373.3zM496 400.5c-26.75 0-48.5-21.75-48.5-48.5s21.75-48.5 48.5-48.5c26.75 0 48.5 21.75 48.5 48.5S522.8 400.5 496 400.5z" />
                  </svg>
                  <span>User Setting</span>
                </Icons>
              </Icon>
            </ListWrap>
          </NavList>
        ) : null}
      </AnimatePresence>
    </Wrap>
  );
}
export default Nav;
