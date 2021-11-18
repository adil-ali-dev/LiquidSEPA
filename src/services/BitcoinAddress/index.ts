import { validate, getAddressInfo, Network } from 'bitcoin-address-validation';

import { PRODUCTION } from '../../constants';

type ValidateCb = (message: null | string) => void;

const BITCOIN_NETWORK = PRODUCTION ? Network.mainnet : Network.regtest;
const TYPES = new Set(['p2wpkh', 'p2wsh', 'p2sh']);

export class BitcoinAddressService {
  static validate(address: string, cb: ValidateCb) {
    if (!validate(address, BITCOIN_NETWORK)) {
      cb('Address is invalid');
      return;
    }

    const addressInfo = getAddressInfo(address);
    if (!TYPES.has(addressInfo.type)) {
      cb('Unsupported Address type');
      return;
    }

    cb(null);
  }

  static crop(address: string, length: number) {
    return address.length < length ? address : `${ address.slice(0, length) }...`;
  }
}
