import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { RowProps } from '../typedef';
import { useStyles } from '../style';
import { ProductIcon } from './product-icon';

export const Row = memo<RowProps>(({
  label,
  spaceLarge,
  spaceMedium,
  spaceSmall,
  product,
  value,
  children
}) => {
  const classes = useStyles();

  const className = clsx(
    classes.row,
    spaceLarge && classes.spaceLarge,
    spaceMedium && classes.rowSpaceMedium,
    spaceSmall && classes.rowSpaceSmall
  );

  return (
    <Grid className={ className }>
      <Typography className={ classes.rowText }>{ label }:</Typography>
      {
        children || (product ? (
          <Grid className={ clsx(classes.rowText, classes.rowProduct) }>
            <ProductIcon className={ classes.paymentDetailsItemAmountIcon } name={ product }/>
            { value } { product }
          </Grid>
        ) : (
          <Typography className={ classes.rowText }>
            { value }
          </Typography>
        ))
      }
    </Grid>
  );
});
