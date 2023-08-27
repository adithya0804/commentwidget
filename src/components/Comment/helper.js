import { userInfo } from "../../utils/sampleData";

/**
 * Handles the editing of the comments
 *
 * @param { objectId } userId
 *   id of the comment to be edited
 **
 * @returns { Array<User> }
 *  returns the user matching the userId
 *
 */
export const getUserInfo = (userId) => {
  return userInfo.filter((user) => user.id === userId);
};

/**
 * Handles the editing of the comments
 *
 * @param { Date } postedDate
 *   id of the comment to be edited
 **
 * @returns { String}
 *  returns the String value of time elpased between present time and time of posting
 *
 */
export const getDuration = (postedDate) => {
  const currentTime = new Date();
  const diffInSeconds = Math.floor((currentTime - new Date(postedDate)) / 1000);
  if (diffInSeconds === 0) {
    return "Just now";
  }
  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${diffInSeconds === 1 ? "second" : "seconds"} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 31) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 31);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
};
