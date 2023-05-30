import { FC } from "react";
import styles from "./Header.module.scss";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "../../static/icons/logo.svg";

type Props = {
  token: string;
  onResetToken: () => void;
};

const Header: FC<Props> = ({ token, onResetToken }) => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerBox}>
          <Logo className={styles.logoIcon} />
          <a href="#users-list" className={styles.button}>
            Users
          </a>
          {!token && (
            <a href="#sign-up" className={styles.button}>
              Sign up
            </a>
          )}
          {token && (
            <Button className={styles.button} onClick={onResetToken}>
              Log out
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
