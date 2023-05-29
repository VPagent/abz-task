import { FC } from "react";
import styles from "./Header.module.scss";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "../../static/icons/logo.svg";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerBox}>
          <Logo className={styles.logoIcon} />
          <Button className={styles.button} onClick={() => {}}>
            Sign up
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
