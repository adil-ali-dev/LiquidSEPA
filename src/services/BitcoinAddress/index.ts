export class BitcoinAddressService {
  static crop(address: string, length: number) {
    return address.length < length ? address : `${ address.slice(0, length) }...`;
  }
}
