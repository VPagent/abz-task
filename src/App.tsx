import { FC, useEffect } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import UsersList from "./components/UsersList/UsersList";
import useUsersContext from "./contexts/UsersContext";

const App: FC = () => {
  const { users } = useUsersContext();

  return (
    <>
      <Header />
      <Hero />
      <UsersList users={users} />
    </>
  );
};

export default App;
