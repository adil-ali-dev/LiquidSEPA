export type EurXDepositVariables = {
  amount: number;
  address?: string;
  iban: string
};

export type EurDepositVariables = {
  amount: number;
  address: string;
};

export type DepositData = {
  rfqId: string;
  trackingCode: string;
  isValid: true;
  errorMessage: null | string;
};

export type EurXDepositData = {
  eurXRfq: DepositData;
};

export type EurDepositData = {
  eurRfq: DepositData;
};
