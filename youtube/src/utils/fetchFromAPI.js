import axios from "axios";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data.data;
};

export const getVideoAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`);
  return data.data;
};

export const getVideoTypeAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`);
  return data.data;
};

export const getVideoWithTypeAPI = async (typeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-with-type/${typeId}`
  );
  return data.data;
};

export const getVideoPageAPI = async (page) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-page/${page}`);
  return data.data; // => {videoList, totalPage}
};

export const getVideoDetailAPI = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-detail/${videoId}`
  );
  return data.data;
};

export const signUpAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/sign-up`, model);
  return data;
};

export const loginAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login`, model);
  return data;
};
