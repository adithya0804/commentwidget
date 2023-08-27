import { useState } from "react";
import CommentWidget from "./components/CommentWidget";
import Dropdown from "./components/Dropdown";
import { initialComments, userInfo } from "./utils/sampleData";
import { v4 as uuidv4 } from "uuid";
import styles from "./app.module.css";
import { getUserInfo } from "./utils/helper";

const userOptions = [
  {
    value: "2f19a5d9-0d0d-4bf3-9f9c-c51eb439af6f",
    label: "John Doe",
  },
  {
    value: "45c30818-6485-4ec6-9ef7-11c7b08391d0",
    label: "Charlie123",
  },
  {
    value: "6fb0b23c-6139-437b-bc61-d41875d7e36e",
    label: "Jane Doe",
  },
];
function App() {
  const [user, setUser] = useState(userInfo[0].id);
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || initialComments
  );
  /**
   * Handles the editing of the comments
   *
   * @param { uuid } commentId
   *   id of the comment to be edited
   *
   * @param { String } editText
   *    the new edited comment text
   *
   * @returns { null }
   *   since no return value is required it returns null and sets the comments object to updated one
   *
   */

  const handleEdit = (commentId, editText) => {
    const index = comments.findIndex((item) => item.id === commentId);
    const updatedComments = [...comments];
    updatedComments[index].comment = editText;
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  /**
   * Handles the deleting of the comments
   *
   * @param { uuid} commentId
   *   id of the comment to be deleted
   * *
   * @returns { null }
   *   since no return value is required it returns null and sets the comments object to updated one
   *
   */

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter((item) => {
      return item.id !== commentId && item.parentCommentId !== commentId;
    });
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  /**
   * Handles the replyin to the comments
   *
   * @param { uuid} commentId
   *   id of the comment to which the comment is being replied to, null in the case of new comments
   * *
   * @param { String} replyText
   *   text content of the new added comment
   * *
   * @returns { null }
   *   since no return value is required it returns null and sets the comments object to updated one
   *
   */

  const handleReply = (parentCommentId, replyText) => {
    const newReply = {
      id: uuidv4(), // Generate unique commentId
      comment: replyText,
      postedBy: user,
      postedOn: new Date().toISOString(),
      likes: 0,
      parentCommentId: parentCommentId,
    };
    // Update state with new reply
    const updatedComments = [...comments, newReply];
    setComments(updatedComments);

    // Save updated comments to localStorage
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  /**
   * Handles the liking of the comments
   *
   * @param {uuid} commentId
   *   id of the comment of which the likes have to be updated
   * *
   * @returns { null }
   *   since no return value is required it returns null and sets the comments object to updated one after increasing likes
   *
   */
  const onLike = (commentId) => {
    const index = comments.findIndex((item) => item.id === commentId);
    const likes = comments[index].likes;
    const updatedComments = [...comments];
    updatedComments[index].likes = likes + 1;
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  //to select the user
  const handleSelect = (value) => {
    setUser(value);
  };

  // This function is used to send the user information to the widget so that it can show the commeted user and the user to which the comment has been addressed if any
  const mapUserInfo = (comment) => {
    const userInfo = getUserInfo(comment?.postedBy);
    const parentComment = comments.filter(
      (item) => comment.parentCommentId === item.id
    );
    if (parentComment.postedBy) {
      const parentUser = getUserInfo(parentComment.postedBy);
      return {
        postedBy: userInfo,
        replyingTo: parentUser,
      };
    } else {
      return {
        postedBy: userInfo,
        replyingTo: null,
      };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <span>Select User </span>{" "}
        <Dropdown onSelect={handleSelect} options={userOptions} />
      </div>
      <CommentWidget
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleReply={handleReply}
        onLike={onLike}
        comments={comments}
        getUserInfo={mapUserInfo}
      />
    </div>
  );
}

export default App;
