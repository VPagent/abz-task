import axios from "axios";
import { privateAPI, publicAPI, apiToken } from "./http";
import { USER_TOKEN_KEY } from "../constans";

// const BASE_URL =
//   "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6";

export const fetchUsers = async (page: number) => {
  const { data } = await publicAPI.get(`users?page=${page}&count=6`);

  console.log(data);

  return data;
};

export const getToken = async () => {
  const { data } = await publicAPI.get("token");
  console.log("token data", data);

  return data;
};

export const registrationUser = async (requestBody: any) => {
  const newToken = await getToken();

  apiToken.set(newToken.token);
  localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(newToken.token));

  const { data } = await privateAPI.post(`users`, requestBody);

  return data;
};

export const getPosition = async () => {
  const { data } = await publicAPI.get("positions");

  console.log("position data", data);

  return data;
};

// export const addTask = async (taskData: any) => {
//   // console.log(taskData)
//   const { data } = await privateAPI.post(`/task`, taskData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };
