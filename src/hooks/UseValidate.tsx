export const UseValidate = () => {
  const validateName = (name: string) => {
    if (name.length >= 2 && name.length <= 60) {
      return true;
    } else {
      return false;
    }
  };

  const validateEmail = (email: string) => {
    if (email.length >= 2 && email.length <= 100 && email.includes("@")) {
      return true;
    } else {
      return false;
    }
  };

  const validatePhone = (phone: string) => {
    if (phone.includes("+380") && phone.length === 13) {
      return true;
    } else {
      return false;
    }
  };

  const validatePosition = (position: string) => {
    if (
      position.length === 1 &&
      (position === "1" ||
        position === "2" ||
        position === "3" ||
        position === "3")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateFile = (file: any) => {
    if (file) {
      const sizeOfMegabites = file?.size / 2 ** 20;

      if (sizeOfMegabites > 5) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  return {
    validateName,
    validateEmail,
    validatePhone,
    validatePosition,
    validateFile,
  };
};
