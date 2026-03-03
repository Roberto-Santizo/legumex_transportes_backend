export const getFourDigitToken = (): string => {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    return token;
};

export const getSixDigitToken = (): string => {
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  return token;
};