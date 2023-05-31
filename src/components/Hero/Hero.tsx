import { FC } from "react";
import styles from "./Hero.module.scss";
import Container from "../Container/Container";
import Button from "../Button/Button";

type Props = {
  token: string;
  onResetToken: () => void;
};

const Hero: FC<Props> = ({ token, onResetToken }) => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.contentWrapper}>
          <h1 className={styles.mainTitle}>
            Test assignment for front-end developer
          </h1>
          <p className={styles.heroText}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          {!token && (
            <a href="#sign-up" className={styles.button}>
              Sign-up
            </a>
          )}
          {token && (
            <Button className={styles.button} onClick={onResetToken}>
              Log out
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
