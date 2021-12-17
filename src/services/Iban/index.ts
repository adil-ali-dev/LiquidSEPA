import { friendlyFormatIBAN, isValidIBAN } from 'ibantools';

export class IbanService {
  static format(value?: string) {
    return friendlyFormatIBAN(value) || '';
  }

  static isValid(value: string) {
    return isValidIBAN(value);
  }
}
