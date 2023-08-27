import React, {useState} from "react";
import { v4 as uuidv4 } from "uuid";
import Comment from "../Comment";
import CommentInput from "../CommentInput";
import Dropdown from "../Dropdown";
import styles from "./commentwidget.module.css"

const sortOptions=[{
  label:"Date",
  value:"postedOn"
},
{
  label:"Likes",
  value:"likes"
}]

/**
 *
 * @param { Array<Comments>} initialComments 
 *   Dummy array of comments
 * *
 *  * @param { ObjectId} userId
 *   user id of the user interacting with widget
 * *
 * @returns { JSX.Element  }
 *  JSX for comments widget
 *
 */
const CommentWidget = ({ initialComments, userId }) => {
const [comments, setComments]= useState(JSON.parse(localStorage.getItem('comments'))||initialComments);
const [sort, setSort]=useState("postedOn");

/**
 * Handles the editing of the comments
 *
 * @param { objectId } commentId
 *   id of the comment to be edited
 * 
 * @param { String } editText
 *    the new edited comment text
 *
 * @returns { null }
 *   since no return value is required it returns null and sets the comments object to updated one
 *
 */

const handleEdit=(commentId, editText)=>{
  const index = comments.findIndex(item => item.id === commentId);
const updatedComments=[...comments];
updatedComments[index].comment=editText
localStorage.setItem('comments', JSON.stringify(updatedComments));
setComments(updatedComments);
}

/**
 * Handles the deleting of the comments
 *
 * @param { objectId} commentId
 *   id of the comment to be deleted
 * *
 * @returns { null }
 *   since no return value is required it returns null and sets the comments object to updated one
 *
 */

const handleDelete=(commentId)=>{
const updatedComments=comments.filter(item=>{
  return item.id!==commentId && item.parentCommentId!==commentId
});
localStorage.setItem('comments', JSON.stringify(updatedComments));
setComments(updatedComments);
}

/**
 * Handles the replyin to the comments
 *
 * @param { objectId} commentId
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
    postedBy: userId,
    postedOn: new Date().toISOString(),
    likes: 0,
    parentCommentId: parentCommentId,
  };
  // Update state with new reply
  const updatedComments = [...comments, newReply];
  setComments(updatedComments);

  // Save updated comments to localStorage
  localStorage.setItem('comments', JSON.stringify(updatedComments));
};

/**
 * Handles the liking of the comments
 *
 * @param {objectId} commentId
 *   id of the comment of which the likes have to be updated
 * *
 * @returns { null }
 *   since no return value is required it returns null and sets the comments object to updated one after increasing likes
 *
 */
const onLike=(commentId)=>{  
  const index = comments.findIndex(item => item.id === commentId);
const likes=comments[index].likes;
const updatedComments=[...comments];
updatedComments[index].likes=likes+1;
localStorage.setItem('comments', JSON.stringify(updatedComments));
setComments(updatedComments);
}
const handleSelect=(value)=>{
setSort(value)
}

  return <div className={styles.container}>
 <div className={styles.sort}>  <span>Sort By </span>
    <Dropdown onSelect={handleSelect} options={sortOptions}/>
    </div> 
    <CommentInput handleReply={handleReply} />
      {comments?.filter(item=>item.parentCommentId===null).sort((a,b)=>{
        return b[sort]-a[sort]
      }).map((comment) => (
        <div key={comment.id}>
        <Comment    
          comment={comment}
          onLike={onLike}
          onReply={handleReply}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isReply={false}
          sortBy={sort}
          comments={comments}
        />
        </div>
      ))}
 
  </div>;
};

export default CommentWidget;
