import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import cn from "clsx";

type Props = {
  className?: string;
  formButton?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const Button: FC<Props> = ({ className, formButton, children, onClick }) => {
  return (
    <button
      className={cn(styles.button, className)}
      onClick={onClick}
      type={formButton ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
