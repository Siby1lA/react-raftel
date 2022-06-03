import { useState } from "react";
import styled from "styled-components";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Comments = styled.div`
  display: flex;
  align-items: center;
  background-color: #152232;
  border-radius: 10px;
  padding: 10px;
`;
const CommentsInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #152232;
  border-radius: 10px;
  padding: 10px;
  textarea {
    height: 10vh;
    background-color: #0a1622;
    overflow: auto;
    vertical-align: top;
    resize: vertical;
    border: none;
    width: 100%;
    color: whitesmoke;
    ::placeholder {
    }
    &:focus {
      outline: none;
      border-color: #388e3c;
    }
  }
`;
const UserImg = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  margin-right: 10px;
`;

const CommentBox = styled.div`
  width: 100%;
`;
const Comment = styled.div``;

function CommentInput({ animeNum, userinfo }: any) {
  const [comment, setComment] = useState("");

  const [attachment, setAttachment] = useState("");

  const onsubmit = async (e: any) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(
        storageService,
        `${userinfo?.email.split("@")[0]}/${uuidv4()}`
      );
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const posting = {
      creator: userinfo?.email.split("@")[0],
      text: comment,
      createdAt: Date.now(),
      animeNum: animeNum,
      profileImg: userinfo.photoURL,
      attachmentUrl,
    };
    try {
      const docRef = await addDoc(collection(dbService, "comments"), posting);
      setComment("");
      setAttachment("");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const onChange = (e: any) => {
    setComment(e.target.value);
  };
  return (
    <CommentsInput>
      <UserImg
        bgphoto={
          userinfo.photoURL === null
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
            : userinfo.photoURL
        }
      ></UserImg>
      <CommentBox>
        <Comment>
          <form onSubmit={onsubmit}>
            <textarea
              onChange={onChange}
              value={comment}
              placeholder="Comment..."
            ></textarea>
            <button>SEND</button>
          </form>
        </Comment>
      </CommentBox>
    </CommentsInput>
  );
}
export default CommentInput;
