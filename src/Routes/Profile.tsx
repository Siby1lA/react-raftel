import { updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import styled from "styled-components";
import { storageService, upload } from "../firebase";

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

const UserImg = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 15px;
`;

function Profile() {
  const { userinfo } = useSelector((state: any) => ({
    userinfo: state.userinfo,
  }));
  const [photo, setPhoto] = useState<any>(null);
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
  );
  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  function handleClick() {
    upload(photo, userinfo, setLoading);
  }
  useEffect(() => {
    if (userinfo?.photoURL) {
      setPhotoURL(userinfo.photoURL);
    }
  }, [userinfo, loading]);
  return (
    <Wrap>
      <Header>Profile</Header>
      {userinfo && (
        <>
          <UserImg bgphoto={photoURL}></UserImg>
          <input disabled={loading} type="file" onChange={handleChange} />
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </Wrap>
  );
}
export default Profile;
