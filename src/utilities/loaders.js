import { axiosLoggedInConfig, axiosLoggedOutConfig } from "./defaultConfig";

import {
  createPostURL,
  loginURL,
  registerUserURL,
  testURL,
  listPostsURL,
  approvePostURL,
  rejectPostURL,
  createCommentURL
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
    localStorage.setItem("lgrf", response.data.result);
    localStorage.setItem("user_id", response.data.id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
  try {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("lgac", "null");
    localStorage.setItem("lgrf", "null");
    localStorage.setItem("user_id", "null");
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

export const listPosts = async () => {
  try {
    const response = await axiosLoggedInConfig().get(listPostsURL);
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

export const rejectPost = async (data) => {
  try {
    const response = await axiosLoggedInConfig().post(rejectPostURL, data)
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