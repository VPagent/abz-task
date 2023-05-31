import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchUsers } from "../services/API";
import { USER_TOKEN_KEY } from "../constans";
import { apiToken } from "../services/http";

const UserContext = createContext({
  users: [],
  token: "",
  numberOfPages: 1,
  page: 1,
  isLoading: false,
  onLoadMore: () => {},
  onRegistrationComplete: () => {},
  onResetToken: () => {},
});

type Props = {
  children: ReactNode;
};

export const UsersProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>(
    JSON.parse(localStorage.getItem(USER_TOKEN_KEY) as string) || ""
  );

  useEffect(() => {
    setIsLoading(true);

    fetchUsers(page)
      .then((data) => {
        if (users) {
          //@ts-ignore
          setUsers([...users, ...data.users]);
          setNumberOfPages(data.total_pages);
          console.log("data in context", data);
        } else {
          setUsers(data.users);
          setNumberOfPages(data.total_pages);
          console.log("data in context", data);
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, [page]);

  useEffect(() => {
    if (localStorage.getItem(USER_TOKEN_KEY)) {
      setToken(JSON.parse(localStorage.getItem(USER_TOKEN_KEY) as string));
    }
  }, [localStorage.getItem(USER_TOKEN_KEY)]);

  const onResetToken = () => {
    setToken("");
    localStorage.removeItem(USER_TOKEN_KEY);
    apiToken.unset();
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onRegistrationComplete = () => {
    setIsLoading(true);
    setUsers(null);
    setPage(1);

    fetchUsers(page)
      .then((data) => {
        setUsers(data.users);
        setNumberOfPages(data.total_pages);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  };

  console.log("Users", users);
  return (
    <UserContext.Provider
      value={{
        //@ts-ignore
        users,
        page,
        token,
        numberOfPages,
        isLoading,
        onResetToken,
        onLoadMore,
        onRegistrationComplete,
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
