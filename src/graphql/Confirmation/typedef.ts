export type ConfirmationVariables = {
  rfqId: string;
  confirm: boolean;
};

export type ConfirmationData = {
  confirmRfq: {
    rfqId: string;
    trackingCode: string;
    isValid: boolean;
    errorMessage: null | string;
  };
};
