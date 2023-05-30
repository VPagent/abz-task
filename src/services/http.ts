import axios from "axios";

export const privateAPI = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
});

export const publicAPI = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
});

export const apiToken = {
  set(token: string) {
    privateAPI.defaults.headers.Token = token;
  },
  unset() {
    privateAPI.defaults.headers.Token = "";
  },
};
