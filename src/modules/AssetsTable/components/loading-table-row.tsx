import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

import { LoadingTableRowProps } from '../typedef';
import { useStyles } from '../style';

export const LoadingTableRow: FC<LoadingTableRowProps> = ({ length }) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.assetsTableRow }>
      {
        Array.from({ length }).fill(null).map((_, idx) => (
          <Grid className={ clsx(classes.assetsTableBodyCell, classes.assetsTableBodyCellLoading) } key={ idx }>
            Loading...
          </Grid>
        ))
      }
    </Grid>
  );
};
