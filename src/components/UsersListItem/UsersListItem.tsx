import { FC } from "react";
import styles from "./UsersListItem.module.scss";

type Props = {
  user: any;
};

const UsersListItem: FC<Props> = ({ user }) => {
  const { name, phone, photo, position } = user;

  return (
    <div className={styles.card}>
      <div className={styles.photoBox}>
        <img className={styles.img} src={photo} alt={name} />
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.position}>{position}</p>
      <p className={styles.phone}>{phone}</p>
    </div>
  );
};

export default UsersListItem;
