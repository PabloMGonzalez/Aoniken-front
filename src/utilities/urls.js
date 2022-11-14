export const BASE_URL = "https://localhost:7020/";


//USER
export const loginURL = BASE_URL.concat("user/login/");
export const logoutURL = BASE_URL.concat("logout/");
export const registerUserURL = BASE_URL.concat("user/register/");

//POST
export const createPostURL = BASE_URL.concat("post/create_post/");
export const approvePostURL = BASE_URL.concat("post/approve_post");
export const rejectPostURL = BASE_URL.concat("post/reject_post");   
export const editPostURL = BASE_URL.concat("post/edit_post");
export const listApprovedPostURL = BASE_URL.concat("post/list_approved_posts");
export const listPostPendingApprovalURL = BASE_URL.concat("post/list_pending_approval_posts");
export const listUnapprovedPostURL = BASE_URL.concat("post/list_unapproved_posts");
export const selectPostURL = BASE_URL.concat("post/select_post");
export const deletePostURL = BASE_URL.concat("post/delete_post");

//COMMENT
export const createCommentURL = BASE_URL.concat("comment/create_comment");
export const listCommentsURL = BASE_URL.concat("comment/list_comments");

//TEST
export const testURL = BASE_URL.concat("WeatherForecast/");