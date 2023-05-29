import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchUsers } from "../services/API";

const UserContext = createContext({
  users: [],
});

type Props = {
  children: ReactNode;
};

export const UsersProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers(page)
      .then((data) => setUsers(data.users))
      .catch((error) => console.log(error.message));
  }, []);

  console.log("Users", users);
  return (
    <UserContext.Provider
      value={{
        //@ts-ignore
        users,
        page,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUsersContext = () => {
  return useContext(UserContext);
};

export default useUsersContext;
