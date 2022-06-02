import { async } from "@firebase/util";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";

const Wrap = styled.div``;
const UpdateComment = styled.div`
  position: absolute;
  right: 0;
  margin-right: 10px;
`;
const Btn = styled.div`
  background-color: #0a1622;
  padding: 5px;
  border-radius: 5px;
  :last-child {
    margin-top: 3px;
  }
`;
const UpdateInput = styled.div`
  position: absolute;
  width: 80%;
  form {
    display: flex;
    height: 55px;
  }
  textarea {
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
function CommentUpdate({ id }: any) {
  const [newComment, setNewComment] = useState("");
  const [updateClick, setUpdateClick] = useState(false);
  const TextRef = doc(dbService, "comments", `${id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Delete?");
    if (ok) await deleteDoc(TextRef);
  };
  const onsubmit = async (e: any) => {
    e.preventDefault();
    ClickUp();
  };
  const ClickUp = async () => {
    const ok = window.confirm("Update?");
    if (ok) {
      await updateDoc(TextRef, {
        text: newComment,
      });
      setNewComment("");
    }
    setUpdateClick((prev) => !prev);
  };
  const onChange = (e: any) => {
    setNewComment(e.target.value);
  };
  return (
    <>
      <UpdateComment>
        <Btn onClick={() => setUpdateClick((prev) => !prev)}>Update</Btn>
        <Btn onClick={onDeleteClick}>Delete</Btn>
      </UpdateComment>
      {updateClick && (
        <UpdateInput>
          <form onSubmit={onsubmit}>
            <textarea
              onChange={onChange}
              value={newComment}
              placeholder="Comment..."
            ></textarea>
            <button>SEND</button>
          </form>
        </UpdateInput>
      )}
    </>
  );
}
export default CommentUpdate;
