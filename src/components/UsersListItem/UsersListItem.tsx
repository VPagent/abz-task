import { FC } from "react";
import styles from "./UsersListItem.module.scss";
import { ReactComponent as PhotoPlaceHolder } from "../../static/icons/userPhotoPlaceholder.svg";

type Props = {
  user: any;
};

const UsersListItem: FC<Props> = ({ user }) => {
  const { name, phone, photo, email, position } = user;

  return (
    <div className={styles.card}>
      <div className={styles.photoBox}>
        {photo ? (
          <img className={styles.img} src={photo} alt={name} />
        ) : (
          <PhotoPlaceHolder className={styles.img} />
        )}
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.position}>{position}</p>
      <p className={styles.email}>
        {email}
        <span className={styles.tooltip}>{email}</span>
      </p>
      <p className={styles.phone}>{phone}</p>
    </div>
  );
};

export default UsersListItem;
