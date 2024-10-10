export const toLocaleStringEn = (value: any) => {
  let formatEn;
  //  console.log("value = " + value + typeof value);
  let numberValue = Number(value);
  if (value !== undefined) {
    formatEn = numberValue.toLocaleString("en-US");
  } else {
    formatEn = 0;
  }
  return formatEn;
};
