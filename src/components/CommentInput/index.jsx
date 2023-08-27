import React, { useState } from "react";
import styles from "./commentinput.module.css";

/**
 *
 * @param { Function} handleReply
 *   function to handle reply process
 * *
 *  * @param { Function} handleCancel
 *   function to handle cancel process
 * *
 *  * @param { objectId } commentId
 *   id of the comment to which reply is being done
 * 
 * @param { String } initialValue
 *    initial comment text if any
 * *
 * @returns { JSX.Element  }
 *   JSX for comments  input component
 *
 */
const CommentInput = ({handleReply, handleCancel=()=>{}, commentId = null, initialValue="" }) => {

  const [comment, setComment]=useState(initialValue);

  //Handles the submit of the form or input which is then overalll handled in the widget component
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    handleReply(commentId, comment);
    setComment("");
  }

  //Handles the cancel of the form or input which is then overalll handled in the comment component
  const handleFormCancel=(e)=>{
    e.preventDefault();
    setComment("");
    handleCancel();
  }

  return   <div className={styles.container}>
  <form onSubmit={handleFormSubmit} className={styles.form}>
    <textarea
    className={styles.textarea}
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
      placeholder="Join the discussion..."
      required
      maxLength={200}/>
  {comment.length>0 && (<div className={styles.buttonGroup}><button className={styles.buttons} type="submit">Submit</button>
  <button  className={styles.buttons} onClick={handleFormCancel}>Cancel</button>
  </div>
  )}  
  </form>
 {comment.length>0 && <p className={styles.remaining}>Remaining characters: {200 - comment.length}</p>}
</div>;
};

export default CommentInput;
