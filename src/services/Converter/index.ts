export class ConverterService {
  static separateWith(value: string | number, separator: string): string {
    const string = typeof value === 'number' ? value.toString() : value;

    return string.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }

  static separate(value: string | number, separator: string): string {
    const string = typeof value === 'number' ? value.toString() : value;

    const parts = string.split('.');

    parts[0] = this.separateWith(parts[0], separator);

    return parts.join('.');
  }

  static convertAmount(value: string, precision?: number): string {
    const regexp = new RegExp(`\\w{${ precision || 8 }}$`);

    return this.separateWith(value.replace(regexp, ''), ',');
  }

  static convertToNumber(value: string, separator = ',') {
    return Number(value.replaceAll(separator, ''));
  }
}
