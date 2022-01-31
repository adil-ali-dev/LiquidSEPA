import React, { FC } from 'react';
import { Link } from '@material-ui/core';
import clsx from 'clsx';

import { IssuerProps } from '../typedef';
import { PEGxIcon } from '../../../assets/Icons';
import TetherIcon from '../../../assets/Icons/tetherto.png'
import { useStyles } from '../style';

export const Issuer: FC<IssuerProps> = ({ issuer }) => {
  const classes = useStyles();

  return (
    <Link
      className={ clsx(classes.assetsTableBodyCellLink, classes.assetsTableBodyCellLinkIssuer) }
      href={ `https://${ issuer }` }
      target="_blank"
    >
      { issuer === 'pegx.io' ? <PEGxIcon/> : <img className={ classes.assetsTableBodyCellLinkImg } src={TetherIcon} /> }
    </Link>
  );
};
