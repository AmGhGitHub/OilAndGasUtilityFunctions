export const fixedDecimalNumber = (number, number_decimal_digits) => {
  const multiplier = Math.pow(10, number_decimal_digits);
  const value = Math.round((number + Number.EPSILON) * multiplier) / multiplier;
  return value.toFixed(number_decimal_digits);
};

export const formatThousandSeparator = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatGasBg = (x) => {
  return fixedDecimalNumber(x * 1000, 3);
};
