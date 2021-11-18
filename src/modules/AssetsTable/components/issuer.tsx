import React, { FC } from 'react';
import { Link } from '@material-ui/core';
import clsx from 'clsx';

import { IssuerProps } from '../typedef';
import { PEGxIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

export const Issuer: FC<IssuerProps> = ({ issuer }) => {
  const classes = useStyles();

  return (
    <Link
      className={ clsx(classes.assetsTableBodyCellLink, classes.assetsTableBodyCellLinkIssuer) }
      href={ `https://${ issuer }` }
      target="_blank"
    >
      { issuer === 'pegx.io' ? <PEGxIcon/> : issuer }
    </Link>
  );
};
