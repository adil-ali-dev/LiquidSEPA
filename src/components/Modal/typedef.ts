import { ReactNode, ReactNodeArray } from 'react';

export type Props = {
  status: boolean;
  handleClose: () => void;
  children: ReactNode | ReactNodeArray;
};
