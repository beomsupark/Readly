import axios from "axios";
import useUserStore from "../store/userStore"; // userStore의 실제 경로로 수정해주세요

const API_BASE_URL = "https://i11c207.p.ssafy.io/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    console.log("Current token:", token); // 추가된 부분
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우
      useUserStore.getState().clearUser();
      throw new Error("인증에 실패했습니다. 다시 로그인해주세요.");
    }
    return Promise.reject(error);
  }
);

export const login = async (loginData) => {
  try {
    const response = await api.post("/member/login", loginData);
    useUserStore.getState().setUser(response.data.loginInfo);
    useUserStore.getState().setToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signUp = async (signUpData) => {
  try {
    const response = await api.post("/member/signup", signUpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.delete("/member/logout");
    useUserStore.getState().clearUser();
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get("/member/info");
    return response.data.memberInfo || response.data;
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    }
    throw error;
  }
};

export const updateUserInfo = async (updateData) => {
  try {
    const response = await api.patch("/member", updateData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update user info");
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

export const getMemberInfo = async (id) => {
  try {
    const response = await api.get(`/member/${id}`);
    return response.data.memberInfo;
  } catch (error) {
    console.error("Error fetching member info:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    }
    throw error.response?.data || error.message;
  }
};
