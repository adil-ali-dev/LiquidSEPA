import React, { FC } from 'react';
import { Grid, Link, Typography } from '@material-ui/core';

import { TableRowProps } from '../typedef';
import { EurXIcon, UsdTIcon } from '../../../assets/Icons';
import { useStyles } from '../style';
import { Issuer } from './issuer';

export const TableRow: FC<TableRowProps> = ({ asset }) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.assetsTableRow } key={ asset.link }>
      <Grid className={ classes.assetsTableBodyCell }>
        <Grid className={ classes.assetsTableBodyCellIconContainer }>
          {asset.productName === 'EURx'
            ? <EurXIcon className={ classes.assetsTableBodyCellIcon }/>
            : <UsdTIcon className={ classes.assetsTableBodyCellIcon } />
          }
        </Grid>
        <Typography>{ asset.productName }</Typography>
      </Grid>
      <Grid className={ classes.assetsTableBodyCell }>{ asset.productType }</Grid>
      <Grid className={ classes.assetsTableBodyCell }>
        <Issuer issuer={ asset.issuer }/>
      </Grid>
      <Grid className={ classes.assetsTableBodyCell }>{ asset.issuedAmount }</Grid>
      <Grid className={ classes.assetsTableBodyCell }>{ asset.burnedAmount }</Grid>
      <Grid className={ classes.assetsTableBodyCell }>
        <Link className={ classes.assetsTableBodyCellLink } href={ asset.link } target="_blank">Link</Link>
      </Grid>
    </Grid>
  );
};
