export const ethAddressTest = {
  name: "isValidEthAddress",
  message: "${path} must be a valid Ethereum address",
  test: (value?: string) => !value || /^0x[a-fA-F0-9]{40}$/.test(value),
};
