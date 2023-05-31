export const cutString = (value: string, num: number) => {
  if (value.length > num) {
    const newString = value.slice(0, num);
    console.log(newString);
    return `${newString}...`;
  } else {
    return value;
  }
};
