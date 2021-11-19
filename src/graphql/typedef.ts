export enum SignatureStatus {
  PENDING = 'WAITING_LOCAL_ACK',
  WAITING = 'NOT_READY',
  TIMEOUT = 'TIMEOUT',
  SUCCESS = 'SUCCESS',
  USER_CANCELLED = 'USER_CANCELLED',
  RP_CANCELLED = 'RP_CANCELLED',
  ACCOUNT_NOT_VERIFIED = 'NOT_VERIFIED'
}

export type AuthEidStatusData = {
  status: SignatureStatus;
};
