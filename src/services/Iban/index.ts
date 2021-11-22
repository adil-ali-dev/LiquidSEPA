import { extractIBAN, isSEPACountry, friendlyFormatIBAN, isValidIBAN } from 'ibantools';

type ValidateIbanCb = (error: null | string, formatted: string) => void;

export class IbanService {
  static validate(iban: string, cb: ValidateIbanCb) {
    const ibanDetails = extractIBAN(iban.replaceAll(' ', ''));
    const ibanFormatted = this.format(iban);

    if (!ibanDetails.valid) {
      cb('IBAN is invalid', ibanFormatted);
      return;
    }

    if (ibanDetails.countryCode && !isSEPACountry(ibanDetails.countryCode)) {
      cb('SEPA Instant Credit is not supported', ibanFormatted);
      return;
    }

    cb(null, ibanFormatted);
  }

  static format(value?: string) {
    return friendlyFormatIBAN(value) || '';
  }

  static isValid(value: string) {
    return isValidIBAN(value);
  }
}
