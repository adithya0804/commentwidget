import React, { useState } from "react";
import styles from "./comment.module.css";
import CommentInput from "../CommentInput";
import { getDuration } from "./helper";
/**
 *
 *  * @param { Function} handleEdit
 *   function to handle edit process
 * *
 *  * @param { Function} onLike
 *   function to handle likeing process
 * *
 *  * @param { Function} onReply
 *   function to handle replying process
 * *
 *  *  @param { Function} handleDelete
 *   function to handle deleting process
 * *
 *  *  @param { Function} getUserInfo
 *   function to getUserInfo
 * *
 *  * @param { Boolean} isReply
 *   to check if it is main comment or reply to a comment
 * 
 *  * @param { String} sortBy
 *   to set the sort parameter
 * 
 * * @param { Comment} comment
 *    comment to be rendered
 * *
 * *@returns { JSX.Element  }
 *   JSX for comments  input component
 *
 */
const Comment = ({ comment, onLike, onReply, comments, isReply, handleDelete, handleEdit, sortBy, getUserInfo}) => {
  const[userInfo]=useState(getUserInfo(comment));
  const[replyMode, setReplyMode]=useState(false);
  const [editMode, setEditMode]=useState(false);

  //to handle edit process
  const onEditClick=(commentId,replyText)=>{
    handleEdit(commentId, replyText);
    setEditMode(false);
  }

  //to handle reply process
const handleReply=(commentId, replyText)=>{
  console.log(commentId)
  onReply(commentId,replyText)
  setReplyMode(false);
}
  
  return (
<div className={styles.container}>
    <div className={styles.comment}>
      <div className={styles.imageContainer}>
      <img src={userInfo?.postedBy?.profilePic} alt={userInfo?.postedBy?.userName} className={styles.profilePic}/>
      </div>
      <div className={styles.commentBody}>
          <div className={styles.header}> 
        <div className={styles.userName}>{userInfo?.postedBy?.userName}</div>
        {isReply && <div className={styles.replyingTo}> replying to {userInfo?.replyingTo?.userName}</div>}
      <div className={styles.duration}>{getDuration(comment.postedOn)}</div>
      </div>
      {
        editMode?<CommentInput initialValue={comment.comment}handleReply={onEditClick} handleCancel={()=>{setEditMode(false)}} commentId={comment.id}/>:   <p className={styles.commentText}>{comment.comment}</p> 
      }
    {  !editMode &&( <div className={styles.buttonGroup}>
      <button className={styles.buttons} onClick={()=>onLike(comment.id)}>{`Likes ${comment.likes}`}</button>
        <button className={styles.buttons} onClick={()=>(setReplyMode(!replyMode))}>Reply</button>
        <button  className={styles.buttons} onClick={()=>{setEditMode(!editMode)}}>Edit</button>
        <button className={styles.buttons} onClick={()=>{handleDelete(comment.id)}}>Delete</button>
      </div>)}
      </div> 
    </div>
    {replyMode &&<div className={styles.replyInput}> <CommentInput  handleReply={handleReply} handleCancel={()=>{setReplyMode(false)}} commentId={comment.id}/> </div>}
    <div  >
    {comments.filter(item=>item.parentCommentId===comment.id).sort((a,b)=>{
        return b[sortBy]-a[sortBy]
      }).map((reply) => (
             <div className={styles.replies} key={reply.id}>
          <Comment   
            comment={reply}
            onLike={onLike}
            onReply={onReply}
            comments={comments}
            handleDelete={handleDelete} 
            handleEdit={handleEdit}                           
            isReply={true}
            sortBy={sortBy}
            getUserInfo={getUserInfo}
          />
            </div>
        ))}
    </div>
    </div>
  );
};

export default Comment;
