import { ChangeEvent, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./RegistrationForm.module.scss";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { getPosition, registrationUser } from "../../services/API";
import { UseValidate } from "../../hooks/UseValidate";
import RadioButton from "../RadioButton/RadioButton";

type Props = {
  token: string;
  onRegistrationComplete: () => void;
  onResetToken: () => void;
};

const RegistrationForm: FC<Props> = ({
  token,
  onRegistrationComplete,
  onResetToken,
}) => {
  const [availablePositions, setAvailablePositions] = useState<any>("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [userImage, setUserImage] = useState("");
  const {
    validateName,
    validateEmail,
    validatePosition,
    validatePhone,
    validateFile,
  } = UseValidate();

  const isCorrectName = validateName(userName);
  const isCorrectEmail = validateEmail(userEmail);
  const isCorrectPhone = validatePhone(userPhone);
  const isCorrectPosition = validatePosition(userPosition);
  const isCorrectFile = validateFile(userPhoto);

  const isAllDataCorrect = () => {
    if (
      isCorrectName &&
      isCorrectEmail &&
      isCorrectPhone &&
      isCorrectPosition &&
      isCorrectFile
    ) {
      console.log("file", userPhoto);
      console.log("validated");
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const setPositions = async () => {
      const allPositions = await getPosition();

      setAvailablePositions(allPositions.positions);
    };
    try {
      setPositions();
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "name":
        return setUserName(event.target.value);
      case "email":
        return setUserEmail(event.target.value);
      case "phone":
        return setUserPhone(event.target.value);
      case "position":
        return setUserPosition(event.target.value);
      case "photo":
        if (event?.target?.files) {
          const file = event?.target?.files[0];
          const src = file && window.URL.createObjectURL(file);
          setUserPhoto(file);
          setUserImage(src);
        }
        return;

      default:
        return console.log("error in switch");
    }
  };

  const handleFormSubmit = async () => {
    if (isAllDataCorrect()) {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("email", userEmail);
      formData.append("phone", userPhone);
      formData.append("position_id", userPosition);
      formData.append("photo", userPhoto);
      try {
        const resp = await registrationUser(formData);
        onRegistrationComplete();
        console.log(resp);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className={styles.section}>
      <Container>
        <h2>Working with POST request</h2>
        {!token && (
          <form className={styles.form} id="sign-up">
            <label className={styles.textLabel}>
              <input
                className={styles.textInput}
                onChange={handleChangeInput}
                type="text"
                name="name"
                placeholder="Your name"
              />
            </label>
            <label className={styles.textLabel}>
              <input
                className={styles.textInput}
                onChange={handleChangeInput}
                type="email"
                name="email"
                placeholder="Email"
              />
            </label>
            <label className={styles.textLabel}>
              <input
                className={styles.textInput}
                onChange={handleChangeInput}
                type="text"
                name="phone"
                placeholder="Phone"
              />
              <span className={styles.inputBottomText}>
                +38 (XXX) XXX - XX - XX
              </span>
            </label>

            <span className={styles.radioTitle}>Select your position</span>
            {availablePositions &&
              availablePositions.map((positionObject: any) => (
                <RadioButton
                  key={positionObject.id}
                  className={styles.radioBtn}
                  name="position"
                  value={positionObject.id}
                  //@ts-ignore
                  onChange={handleChangeInput}
                  label={<span>{positionObject.name} </span>}
                  checkIdentifier={positionObject.id === userPosition}
                />
                // <label key={positionObject.id}>
                //   <span className={styles.labelText}>
                //     {positionObject.name}
                //   </span>
                //   <input
                //     className={styles.radioInput}
                //     onChange={handleChangeInput}
                //     type="radio"
                //     name="position"
                //     value={positionObject.id}
                //   />
                // </label>
              ))}

            <label>
              <span>Upload your photo</span>
              <input
                className={styles.photoInput}
                onChange={handleChangeInput}
                type="file"
                accept="image/jpg, image/jpeg"
                name="photo"
              />
            </label>

            <Button onClick={handleFormSubmit} disabled={!isAllDataCorrect()}>
              Sign up
            </Button>
          </form>
        )}
        {token && <Button onClick={onResetToken}>Log out</Button>}
      </Container>
    </section>
  );
};

export default RegistrationForm;
