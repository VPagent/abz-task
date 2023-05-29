import { FC } from "react";
import styles from "./UsersListItem.module.scss";

type Props = {
  user: any;
};

const UsersListItem: FC<Props> = ({ user }) => {
  const { name, phone, photo, position } = user;

  return (
    <div className={styles.card}>
      <div>
        <img src={photo} alt={name} />
      </div>
      <p>{name}</p>
      <p>{position}</p>
      <p>{phone}</p>
    </div>
  );
};

export default UsersListItem;
