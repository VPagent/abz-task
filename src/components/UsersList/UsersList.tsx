import { FC } from "react";
import styles from "./UsersList.module.scss";
import UsersListItem from "../UsersListItem/UsersListItem";

type Props = {
  users: any;
};

const UsersList: FC<Props> = ({ users }) => {
  return (
    <div>
      <h2>Working with GET request</h2>
      {users?.map((user: any) => (
        <UsersListItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
