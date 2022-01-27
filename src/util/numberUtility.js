export const roundNumber = (number, sig_digits) => {
  const exponent = Math.pow(10, sig_digits);
  return Math.round((number + Number.EPSILON) * exponent) / exponent;
};
