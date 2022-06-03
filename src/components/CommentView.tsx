import { time } from "console";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "../firebase";
import CommentUpdate from "./CommentUpdate";

const Comments = styled.div`
  display: flex;
  align-items: center;
  background-color: #152232;
  border-radius: 10px;
  padding: 10px;
  margin-top: 15px;
  position: relative;
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
  width: fit-content;
`;

const UserName = styled.div`
  display: flex;
  margin-bottom: 15px;
  div:last-child {
    margin-left: 10px;
  }
`;

const Comment = styled.div``;
function CommentView({ animeNum, userinfo }: any) {
  const [commentViews, setCommentViews] = useState<any>([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "comments"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const commentArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(commentArr);
      setCommentViews(commentArr);
    });
  }, []);
  const dates = (num: number) => {
    var timestamp = num;
    var date = new Date(timestamp);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };
  return (
    <>
      {commentViews.map((commentView: any) => (
        <div key={commentView.createdAt}>
          {commentView.animeNum === animeNum && (
            <Comments>
              <UserImg
                bgphoto={
                  commentView.profileImg === null
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                    : commentView.profileImg
                }
              ></UserImg>
              <CommentBox>
                <UserName>
                  <div>{commentView.creator}</div>
                  <div>{dates(commentView.createdAt)}</div>
                </UserName>
                <Comment>{commentView.text}</Comment>
              </CommentBox>
              {commentView.creator === userinfo?.email.split("@")[0] && (
                <>
                  <CommentUpdate id={commentView.id} />
                </>
              )}
            </Comments>
          )}
        </div>
      ))}
    </>
  );
}

export default CommentView;
