import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #152232;
  button {
    border: none;
    cursor: pointer;
    color: aliceblue;
    font-size: 16px;
    border-radius: 10px;
  }
`;
const Loginwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: whitesmoke;
  border-radius: 10px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;
const Titlewrap = styled.div``;

const Title = styled.h1`
  margin: 30px 0px;
  color: #152232;
  font-size: 38px;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 400px;
    height: 40px;
    padding: 15px 0px;
    border: none;
    border-bottom: 1px solid #91a3b9;
    background-color: whitesmoke;
    font-size: 18px;
    margin-bottom: 10px;
    color: #152232;
    /* background-color: #152232; */
    :nth-child(2) {
      margin-bottom: 25px;
    }
    ::placeholder {
      color: rgba(112, 102, 102, 0.4);
    }
    &:focus {
      outline: none;
      border-color: #152232;
    }
  }
`;

const Joinwrap = styled.div`
  margin: 10px 0px;
  color: whitesmoke;
`;

const APIlogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Loginbtn = styled.button`
  width: 400px;
  height: 50px;
  background-color: #152232;
`;

const Kakaobtn = styled.button`
  width: 300px;
  height: 50px;
  color: #6b7280;
  background-color: #202124;
`;

const Naverbtn = styled.button`
  margin-top: 20px;
  width: 300px;
  height: 50px;
  background-color: #161b22;
`;

const Ul = styled.ul`
  padding: 0;
  color: rgba(112, 102, 102, 0.5);
`;

const Li = styled.li`
  cursor: pointer;
  display: inline-block;
  margin: 10px 20px;
  color: rgba(112, 102, 102, 0.5);
  font-weight: 400;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 50px;
`;
interface IForm {
  id: string;
  pw: string;
}

function Login() {
  const [seccess, Setseccess] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<IForm>();
  const onSubmit = ({ id, pw }: IForm) => {
    // navigate("");
  };
  return (
    <Wrapper>
      <Box>
        <Titlewrap>
          <Title>Login</Title>
        </Titlewrap>
        <Loginwrap>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("id", {
                required: "아이디 입력은 필수입니다.",
              })}
              placeholder="id"
              type="text"
            />
            <input
              {...register("pw", {
                required: "비밀번호 입력은 필수입니다.",
              })}
              placeholder="pw"
              type="password"
            />
            <Loginbtn>Login</Loginbtn>
          </Form>
        </Loginwrap>
        <Joinwrap>
          <Ul>
            <Li>Forgot password</Li> |<Li>Forgot id</Li> |
            <Link to="/join">
              <Li>Join</Li>
            </Link>
          </Ul>
        </Joinwrap>
        <APIlogin>
          <Kakaobtn>google Login</Kakaobtn>
          <Naverbtn>github login</Naverbtn>
        </APIlogin>
      </Box>
    </Wrapper>
  );
}
export default Login;
