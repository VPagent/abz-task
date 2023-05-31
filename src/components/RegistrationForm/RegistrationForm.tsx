import { ChangeEvent, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import cn from "clsx";
import styles from "./RegistrationForm.module.scss";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { getPosition, registrationUser } from "../../services/API";
import { UseValidate } from "../../hooks/UseValidate";
import RadioButton from "../RadioButton/RadioButton";
import { cutString } from "../../helpers/utils";
import Loader from "../Loader/Loader";

type Props = {
  token: string;
  isLoading: boolean;
  onRegistrationComplete: () => void;
  onResetToken: () => void;
};

const RegistrationForm: FC<Props> = ({
  token,
  isLoading,
  onRegistrationComplete,
  onResetToken,
}) => {
  const [availablePositions, setAvailablePositions] = useState<any>("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userPhoto, setUserPhoto] = useState<any>(null);
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

  const userPhotoName = userPhoto
    ? cutString(userPhoto.name, 15)
    : "Upload your photo";

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
    console.log("rabotayou");

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
          setUserPhoto(file);
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
        <h2 className={styles.title}>Working with POST request</h2>
        {!token && (
          <form className={styles.form} id="sign-up">
            <label
              className={cn(
                styles.textLabel,
                userName.length && !isCorrectName && styles.errorText
              )}
            >
              <input
                className={styles.textInput}
                onChange={handleChangeInput}
                type="text"
                name="name"
                placeholder="Your name"
              />
            </label>
            <label
              className={cn(
                styles.textLabel,
                userEmail.length && !isCorrectEmail && styles.errorText
              )}
            >
              <input
                className={cn(styles.textInput)}
                onChange={handleChangeInput}
                type="email"
                name="email"
                placeholder="Email"
              />
            </label>
            <label
              className={cn(
                styles.textLabel,
                userPhone.length && !isCorrectPhone && styles.errorText
              )}
            >
              <input
                className={cn(styles.textInput)}
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
                  label={
                    <span className={styles.radioText}>
                      {positionObject.name}{" "}
                    </span>
                  }
                  checkIdentifier={userPosition}
                />
              ))}
            <div className={styles.uploadBox}>
              <label
                className={cn(
                  styles.uploaderLabel,
                  userPhoto && !isCorrectFile && styles.errorFile
                )}
              >
                <span className={styles.uploadingPhotoTitle}>Upload</span>
                <input
                  className={styles.photoInput}
                  onChange={handleChangeInput}
                  type="file"
                  accept="image/jpg, image/jpeg"
                  name="photo"
                />
              </label>
              <p
                className={cn(
                  styles.userPath,
                  userPhoto && !isCorrectFile && styles.errorFile
                )}
              >
                {userPhotoName}
              </p>
            </div>
            {!isLoading && (
              <Button
                className={styles.button}
                onClick={handleFormSubmit}
                disabled={!isAllDataCorrect()}
              >
                Sign up
              </Button>
            )}
            {isLoading && <Loader className={styles.loader} />}
          </form>
        )}
        {token && (
          <Button className={styles.button} onClick={onResetToken}>
            Log out
          </Button>
        )}
      </Container>
    </section>
  );
};

export default RegistrationForm;
