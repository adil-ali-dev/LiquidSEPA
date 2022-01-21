export enum StatusModalType {
  SUCCESS = 'Success',
  PROCESSING = 'Processing',
  ERROR = 'Error'
}

export type Props = {
  status: boolean;
  text?: null | string;
  processingText?: null | string;
  onlyBody?: boolean;
  btnText?: string;
  type?: StatusModalType;
  handleClose?: () => void;
  handleExited?: () => void;
  handleButtonClick?: () => void;
};
