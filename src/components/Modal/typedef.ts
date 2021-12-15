import { ReactNode, ReactNodeArray } from 'react';

export type Props = {
  status: boolean;
  children: ReactNode | ReactNodeArray;
  handleClose?: () => void;
  handleExited?: () => void;
};
