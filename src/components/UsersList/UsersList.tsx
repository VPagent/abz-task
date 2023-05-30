import { FC } from "react";
import styles from "./UsersList.module.scss";
import UsersListItem from "../UsersListItem/UsersListItem";
import Container from "../Container/Container";
import Button from "../Button/Button";
import useUsersContext from "../../contexts/UsersContext";

const UsersList: FC = () => {
  const { users, numberOfPages, page, onLoadMore } = useUsersContext();

  const inspect = numberOfPages === page;

  return (
    <section className={styles.section}>
      <Container>
        <h2>Working with GET request</h2>
        <div className={styles.list} id="users-list">
          {users?.map((user: any) => (
            <UsersListItem key={user.id} user={user} />
          ))}
        </div>
        {!inspect && (
          <Button className={styles.button} onClick={onLoadMore}>
            Show more
          </Button>
        )}
      </Container>
    </section>
  );
};

export default UsersList;
