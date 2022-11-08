import { axiosLoggedInConfig, axiosLoggedOutConfig } from "./defaultConfig";

import {
  loginURL,  
  registerUserURL, 
  testURL, 
} from "./urls";


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
    localStorage.setItem("lgac", response.data.access);
    localStorage.setItem("lgrf", response.data.refresh);
    return response;
  } catch (error) {
    console.log(error);
  }
}



export const test = async () => {
  try {
    const response = await axiosLoggedOutConfig.get(testURL);
    return response;
  } catch (error) {
    console.log(error);
  }
}
 export const logout = async (setIsLoggedInState, setUserTypeState) => {
   try {
     localStorage.setItem("isLoggedIn", false);
     localStorage.setItem("lgac", "null");
     localStorage.setItem("lgrf", "null");
   } catch (error) {
     console.log(error);
   }
 }


// export const loginAfip = async (data) => {
//   try {
//     const response = await axiosLoggedOutConfig.get(loginAfipURL + "?token=" + data);
//     localStorage.setItem("isLoggedIn", true);
//     localStorage.setItem("lgac", response.data.access);
//     localStorage.setItem("lgrf", response.data.refresh);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const getOldProfile = async (data) => {
//   try {
//     const response = await axiosLoggedInConfig().get(oldProfileURL, data);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const patchUser = async (data, id) => {
//   try {
//     const response = await axiosLoggedInConfig().patch(registerUserURL + id + "/", data);
//     return response;
//   } catch (error) {
//     // console.log(error)
//     return error
//   }
// }


// export const patchProfile = async (data, id) => {
//   try {
//     const response = await axiosLoggedInConfig().patch(userProfileURL + id + "/", data);
//     return response;
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const forgotPassword = async (data) => {
//   try {
//     const response = await axiosLoggedOutConfig.post(
//       forgotPasswordURL,
//       data
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const activateAccount = async (data) => {
//   try {
//     const response = await axiosLoggedOutConfig.post(activateAccountURL, data);
//     return response
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const recoverPassword = async (data) => {
//   try {
//     const response = await axiosLoggedInConfig().post(recoverPasswordURL, data);
//     return response
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const getCurrentProfile = async (data) => {
//   try {
//     const response = await axiosLoggedInConfig().get(userProfileURL, data);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const getUserInfo = async (data) => {
//   try {

//     const response = await axiosLoggedInConfig().get(getUserInfoURL, data);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const passwordRecovery = async (data) => {
//   try {
//     const response = await axiosLoggedInConfig().post(recoveryPasswordURL, data);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }