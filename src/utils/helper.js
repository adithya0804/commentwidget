import { userInfo } from "./sampleData";

/**
 * Handles getting the user object
 *
 * @param { objectId } userId
 *   id of the comment to be edited
 **
 * @returns { Array<User> }
 *  returns the user matching the userId
 *
 */
export const getUserInfo = (userId) => {
  return userInfo.filter((user) => user.id === userId)[0];
};

/**
 * Handles getting the duration
 *
 * @param { Date } postedDate
 *   id of the comment to be edited
 **
 * @returns { String}
 *  returns the String value of time elpased between present time and time of posting
 *
 */
