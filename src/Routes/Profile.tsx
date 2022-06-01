import styled from "styled-components";

const Wrap = styled.div`
  height: 100%;
  margin-top: 65px;
  background-color: #152232;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 34px;
  font-weight: 400;
`;
function Profile() {
  return (
    <Wrap>
      <Header>Profile</Header>
    </Wrap>
  );
}
export default Profile;
