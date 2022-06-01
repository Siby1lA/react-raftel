import { deleteDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import { dbService } from "../firebase";

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
function CommentUpdate({ id }: any) {
  const onDeleteClick = async () => {
    const TextRef = doc(dbService, "comments", `${id}`);
    const ok = window.confirm("Delete?");
    if (ok) await deleteDoc(TextRef);
  };
  return (
    <UpdateComment>
      <Btn>Update</Btn>
      <Btn onClick={onDeleteClick}>Delete</Btn>
    </UpdateComment>
  );
}
export default CommentUpdate;
