import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import { TableProps } from '../typedef';
import { useStyles } from '../style';

export const Table = memo<TableProps>(({ children }) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.assetsTable }>
      <Grid>
        <Grid className={ classes.assetsTableRow }>
          <Grid className={ classes.assetsTableHeadCell }>Product Name</Grid>
          <Grid className={ classes.assetsTableHeadCell }>Product Type</Grid>
          <Grid className={ classes.assetsTableHeadCell }>Issuer</Grid>
          <Grid className={ classes.assetsTableHeadCell }>Issued Amount</Grid>
          <Grid className={ classes.assetsTableHeadCell }>Burned Amount</Grid>
          <Grid className={ classes.assetsTableHeadCell }>Asset Id</Grid>
        </Grid>
      </Grid>
      <Grid>
        { children }
      </Grid>
    </Grid>
  );
});
