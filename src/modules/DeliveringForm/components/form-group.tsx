import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Grid, InputBase, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { ProductType } from '../../../constants';
import { FormGroupProps } from '../typedef';
import { useStyles } from '../style';
import { ProductIcon } from './product-icon';

export const FormGroup = memo<FormGroupProps>(({
  label,
  product,
  className,
  editable,
  handleSwapClick,
  handleDeliverChange
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={ clsx(classes.formGroup, className, product.error && classes.formGroupError) }
      onClick={ handleSwapClick }
    >
      <Typography className={ classes.commonLabel }>
        { label } ({ product.product === ProductType.EUR ? 'cash' : 'stablecoin' })
      </Typography>
      <Grid className={ classes.formGroupRow }>
        <Grid className={ classes.formGroupCurrency }>
          <Grid className={ classes.formGroupCurrencyIconContainer }>
            <ProductIcon name={ product.product }/>
          </Grid>
          <Typography className={ classes.formGroupCurrencyText }>{ product.product }</Typography>
        </Grid>
        <InputBase
          className={ classes.formGroupText }
          value={ product.placeholder }
          key={ `${product.product}-${editable}` }
          autoFocus={ !isMobile }
          inputProps={{ className: clsx(classes.formGroupTextInput, !editable && classes.formGroupTextInputDisabled) }}
          disabled={ !editable }
          onClick={ event => editable && event.stopPropagation() }
          onChange={ handleDeliverChange }
        />
      </Grid>
    </Grid>
  );
});
