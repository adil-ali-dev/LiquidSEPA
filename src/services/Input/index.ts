import { ConverterService } from '../Converter';

type ChangeInput = (placeholder: string, number: number) => void;

export class NumericInput {
  static changeNumberInput(value: string, cb: ChangeInput) {
    const separator = ',';

    const numericValue = Number(value.replaceAll(separator, ''));
    const placeholder = ConverterService.separateWith(numericValue, separator);

    cb(placeholder, numericValue);
  }
}
