import { ReactNode } from 'react';

type Controls = {
  open: () => void;
  close: () => void;
}

export type Context = {
  modalStatus: boolean;
  controls: Controls;
};

export type Props = {
  children: ReactNode;
};
