import React, { memo } from 'react';
import { Button, Grid } from '@material-ui/core';

import { RequisitesHeaderProps } from '../typedef';
import { ArrowLeftIcon } from '../../../assets/Icons';
import { useStyles } from '../style';
import { ProductIcon } from './product-icon';
import { ConverterService } from '../../../services';

export const RequisitesHeader = memo<RequisitesHeaderProps>(({
  sellSide,
  productName,
  amount,
  handleBackClick
}) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.header }>
      <Button
        className={ classes.headerButton }
        onClick={ handleBackClick }
        variant="text"
        disableRipple
        disableFocusRipple
        disableTouchRipple
      >
        <Grid className={ classes.headerButtonIconContainer }>
          <ArrowLeftIcon className={ classes.headerButtonIcon }/>
        </Grid>
      </Button>
      <Grid className={ classes.headerText }>
        Please pay exactly { productName }
        <Grid className={ classes.headerTextIconContainer }>
          <ProductIcon className={ classes.formGroupCurrencyIconText } name={ productName }/>
        </Grid>
        { ConverterService.separate(amount.toFixed(2), ',') } to the following
        { sellSide ? ' Liquid address' : ' account' }:
      </Grid>
    </Grid>
  );
});
