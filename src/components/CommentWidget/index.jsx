import React, {useState} from "react";
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
  * @param { Function} handleEdit
 *   function to handle edit process
 * *
 *  * @param { Function} onLike
 *   function to handle likeing process
 * *
 *  * @param { Function} handleReply
 *   function to handle replying process
 * *
 *  *  * @param { Function} handleDelete
 *   function to handle deleting process
 * *
 *  *  *  * @param { Function} getUserInfo
 *   function to get user Information
 * *
 * * @param {Array<Comment>} comments
 * *
 * @returns { JSX.Element  }
 *  JSX for comments widget
 *
 */
const CommentWidget = ({ handleDelete, handleEdit, handleReply, onLike, comments, getUserInfo}) => {
const [sort, setSort]=useState("postedOn");

//to handle the sorting value by default it is date
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
          getUserInfo={getUserInfo}
        />
        </div>
      ))}
 
  </div>;
};

export default CommentWidget;
