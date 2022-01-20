export type Props = {
  status: boolean;
  loading: boolean;
  qrValue?: null | string;
  handleClose: () => void;
  handleExited: () => void;
};
