//export const BASE_URL = "https://autentica.bahia.gob.ar/";
export const BASE_URL = "https://localhost:7020/";


//USER
export const loginURL = BASE_URL.concat("user/login/");
export const registerUserURL = BASE_URL.concat("user/register/");

//POST
export const listPostsURL = BASE_URL.concat("post/listar_post");
export const createPostURL = BASE_URL.concat("post/create_post/");
export const approvePostURL = BASE_URL.concat("post/approve_post");
export const rejectPostURL = BASE_URL.concat("post/reject_post")

//COMMENT



//TEST
export const testURL = BASE_URL.concat("WeatherForecast/");




export const logoutURL = BASE_URL.concat("logout/");




