import axios from "axios";

export const BASE_URL = "http://localhost:8080";
export const BASE_URL_IMG = "http://localhost:8080/public/img";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("LOGIN_USER"),
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data.data;
};

export const getVideoAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options);
  return data.data;
};

export const getVideoTypeAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`, options);
  return data.data;
};

export const getVideoWithTypeAPI = async (typeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-with-type/${typeId}`,
    options
  );
  return data.data;
};

export const getVideoPageAPI = async (page) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-page/${page}`,
    options
  );
  return data.data; // => {videoList, totalPage}
};

export const getVideoDetailAPI = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-detail/${videoId}`,
    options
  );
  return data.data;
};

export const signUpAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/sign-up`, model, options);
  return data;
};

export const loginAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login`, model, options);
  return data;
};

export const getCommentsAPI = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-comment/${videoId}`,
    options
  );
  return data.data;
};

export const commentAPI = async (model) => {
  const { data } = await axios.post(
    `${BASE_URL}/video/comment`,
    model,
    options
  );
  return data.data;
};

export const loginFacebookAPI = async (model) => {
  const { data } = await axios.post(
    `${BASE_URL}/user/login-facebook`,
    model,
    options
  );
  return data;
};

export const checkEmailAPI = async (model) => {
  const { data } = await axios.post(
    `${BASE_URL}/user/check-email`,
    model,
    options
  );
  return data.data;
};

export const checkCodeAPI = async (model) => {
  const { data } = await axios.post(
    `${BASE_URL}/user/check-code`,
    model,
    options
  );
  return data;
};

export const uploadCloudAPI = async (formData) => {
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/doven5azz/upload`,
    formData
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
  return data;
};

export const uploadAvatarAPI = async (formData) => {
  const { data } = await axios.post(
    `${BASE_URL}/user/upload-avatar`,
    formData,
    options
  );
  return data;
};

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error.response.data === "TokenExpiredError"
    ) {
      axios
        .post(`${BASE_URL}/user/reset-token`, null, options)
        .then((result) => {
          localStorage.setItem("LOGIN_USER", result.data.data);
          window.location.reload();
        })
        .catch((error) => {});
    }
    return Promise.reject(error);
  }
);
