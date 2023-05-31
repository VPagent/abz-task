import { FC, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import UsersList from "./components/UsersList/UsersList";
import useUsersContext from "./contexts/UsersContext";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import { getPosition, getToken } from "./services/API";

const App: FC = () => {
  const { token, isLoading, onRegistrationComplete, onResetToken } =
    useUsersContext();

  return (
    <>
      <Header token={token} onResetToken={onResetToken} />
      <Hero token={token} onResetToken={onResetToken} />
      <UsersList />
      <RegistrationForm
        token={token}
        isLoading={isLoading}
        onRegistrationComplete={onRegistrationComplete}
        onResetToken={onResetToken}
      />
      <ToastContainer />
    </>
  );
};

export default App;
