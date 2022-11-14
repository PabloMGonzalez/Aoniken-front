import { axiosLoggedInConfig, axiosLoggedOutConfig } from "./defaultConfig";

import {
  createPostURL,
  loginURL,
  registerUserURL,
  testURL,
  listApprovedPostURL,
  approvePostURL,
  rejectPostURL,
  createCommentURL,
  editPostURL,
  listPostPendingApprovalURL,
  listUnapprovedPostURL,
  selectPostURL,
  listCommentsURL,
  deletePostURL
} from "./urls";

export const test = async () => {
  try {
    const response = await axiosLoggedOutConfig.get(testURL);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const register = async (data) => {
  try {
    const response = await axiosLoggedOutConfig.post(registerUserURL, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export const login = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(loginURL, data);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("lgac", response.data.result);
    localStorage.setItem("user_id", response.data.id);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("nombre", response.data.nombre);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
  try {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("lgac", "null");
    localStorage.setItem("user_id", "null");
    localStorage.setItem("role", "null");
    localStorage.setItem("nombre", "null");
  } catch (error) {
    console.log(error);
  }
}

export const createPost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(createPostURL, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(deletePostURL, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const editPost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(editPostURL, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const listApprovedPosts = async () => {
  try {
    const response = await axiosLoggedInConfig().get(listApprovedPostURL);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const listUnapprovedPosts = async () => {
  try {
    const response = await axiosLoggedInConfig().get(listUnapprovedPostURL);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const approvePost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(approvePostURL, data)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const listPendingApprovalPosts = async () => {
  try {
    const response = await axiosLoggedInConfig().get(listPostPendingApprovalURL)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const rejectPost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(rejectPostURL, data)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const selectPost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(selectPostURL, data)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const createComment = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(createCommentURL, data)
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getComments = async () => {
  try {
    const response = await axiosLoggedInConfig().get(listCommentsURL)
    return response;
  } catch (error) {
    console.log(error);
  }
}