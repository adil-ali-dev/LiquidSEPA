import { ReactNode } from 'react';

export type Asset = {
  productName: string;
  productType: string;
  issuer: string;
  issuedAmount: string;
  burnedAmount: number;
  link: string;
};

export type WrappedComponentProps = {
  assets: Asset[];
};

export type TableProps = {
  children: ReactNode | ReactNode[];
};

export type TableRowProps = {
  asset: Asset;
};

export type LoadingTableRowProps = {
  length: number;
};

export type IssuerProps = {
  issuer: string;
};
