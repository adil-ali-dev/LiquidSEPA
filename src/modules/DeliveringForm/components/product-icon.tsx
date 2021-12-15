import React, { memo } from 'react';
import clsx from 'clsx';

import { Currency } from '../../../typedef';
import { ProductIconProps } from '../typedef';
import { EurIcon, EurXIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

export const ProductIcon = memo<ProductIconProps>(({ className, name }) => {
  const classes = useStyles();

  return name === Currency.EUR
    ? <EurIcon className={ clsx(classes.formGroupCurrencyIcon, className) }/>
    : <EurXIcon className={ clsx(classes.formGroupCurrencyIcon, className) }/>;
});
