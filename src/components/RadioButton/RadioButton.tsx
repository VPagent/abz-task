import { FC } from "react";
import styles from "./RadioButton.module.scss";
import cn from "clsx";

type Props = {
  name: string;
  value: string;
  label: any;
  className: string;
  checked?: boolean;
  checkIdentifier: any;
  onChange: (e: any) => void;
};

const RadioButton: FC<Props> = ({
  name,
  value,
  label,
  className,
  checkIdentifier,
  onChange,
}) => {
  const isChecked = checkIdentifier === value.toString();

  return (
    <label className={cn(styles.label, className)}>
      <span className={cn(styles.bigCircle, isChecked && styles.checked)}>
        <span
          className={cn(styles.fillCircle, isChecked && styles.checked)}
        ></span>
      </span>
      {label}
      <input
        className={styles.input}
        onChange={onChange}
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
      />
    </label>
  );
};

export default RadioButton;
