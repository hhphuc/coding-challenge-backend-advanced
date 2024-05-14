export const REDEEM_CODE_LENGTH = 8;

export const generateRedeemCode = () =>
  Math.random().toString(36).slice(-REDEEM_CODE_LENGTH);
