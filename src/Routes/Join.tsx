import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../firebase";
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    cursor: pointer;
    padding: 20px 0px;
    color: aliceblue;
    font-size: 16px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Loginwrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Titlewrap = styled.div`
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 30px 0px;
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 400px;
    height: 30px;
    padding: 15px 0px;
    border: none;
    border-bottom: 1px solid #91a3b9;
    font-size: 18px;
    background-color: whitesmoke;
    margin-bottom: 10px;
    color: #152232;
    ::placeholder {
      color: rgba(112, 102, 102, 0.4);
    }
    &:focus {
      outline: none;
      border-color: #152232;
    }
  }
  span {
    color: tomato;
  }
`;

const Joinbtn = styled.button`
  width: 400px;
  height: 50px;
  background-color: #152232;
  margin-top: 15px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 50px;
`;
interface ISignup {
  email: string;
  password: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignup>();
  let data;
  const onSubmit = async ({ email, password }: ISignup) => {
    data = await createUserWithEmailAndPassword(authService, email, password);
    console.log(data);
    navigate("/");
  };

  return (
    <Wrapper>
      <Box>
        <Titlewrap>
          <Title>Join</Title>
        </Titlewrap>
        <Loginwrap>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <input
                {...register("email", {
                  required: "아이디 입력은 필수입니다.",
                })}
                placeholder="email"
                type="text"
              />
            </div>
            <span>{errors?.email?.message}</span>
            <input
              {...register("password", {
                required: "비밀번호 입력은 필수입니다.",
              })}
              placeholder="pw"
              type="password"
            />
            <span>{errors?.password?.message}</span>

            <Joinbtn>Join</Joinbtn>
          </Form>
        </Loginwrap>
      </Box>
    </Wrapper>
  );
}

export default Join;
