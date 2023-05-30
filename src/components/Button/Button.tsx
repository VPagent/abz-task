import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import cn from "clsx";

type Props = {
  className?: string;
  formButton?: boolean;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

const Button: FC<Props> = ({
  className,
  formButton,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={cn(styles.button, className)}
      onClick={onClick}
      type={formButton ? "submit" : "button"}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
