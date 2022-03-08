import { ReactNode } from 'react';

type Controls = {
  open: () => void;
  close: () => void;
}

export type Context = {
  modalStatus: null | boolean;
  controls: Controls;
};

export type Props = {
  children: ReactNode;
};
