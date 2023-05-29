import axios from "axios";

// const BASE_URL =
//   "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6";

export const fetchUsers = async (page: number) => {
  const { data } = await axios.get(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
  );

  console.log(data);

  return data;
};
