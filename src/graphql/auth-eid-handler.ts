import { SignatureStatus } from './typedef';

export const authEidStatusHandler = (status: SignatureStatus, callbacks: (() => void)[]) => {
  switch (status) {
    case SignatureStatus.SUCCESS:
      callbacks[0]();
      break;

    case SignatureStatus.WAITING:
      callbacks[1]();
      break;

    case SignatureStatus.TIMEOUT:
    case SignatureStatus.USER_CANCELLED:
    case SignatureStatus.RP_CANCELLED:
      callbacks[2]();
      break;
  }
}
