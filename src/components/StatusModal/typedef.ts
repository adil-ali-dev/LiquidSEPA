export enum StatusModalType {
  SUCCESS = 'Success',
  PROCESSING = 'Processing',
  ERROR = 'Error'
}

export type Props = {
  status: boolean;
  text?: null | string;
  onlyBody?: boolean;
  type?: StatusModalType;
  handleClose?: () => void;
  handleButtonClick?: () => void;
};
