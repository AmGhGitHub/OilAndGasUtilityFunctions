export const roundNumber = (number, sig_digits) => {
  const exponent = Math.pow(10, sig_digits);
  return Math.round((number + Number.EPSILON) * exponent) / exponent;
};

export const formatThousandSeparator = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
