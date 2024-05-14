export interface IAirdropBasic {
  contractAddress: string;
  recipient: string;
  quantity: number;
}

export interface IAirdropDetails extends IAirdropBasic {
  redeemed: boolean;
}

export interface IAirdropJob extends IAirdropDetails {
  redeemCode: string;
}
