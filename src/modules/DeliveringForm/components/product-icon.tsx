import React, { memo } from 'react';
import clsx from 'clsx';

import { ProductType } from '../../../constants';
import { ProductIconProps } from '../typedef';
import { EurIcon, EurXIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

export const ProductIcon = memo<ProductIconProps>(({ className, name }) => {
  const classes = useStyles();

  return name === ProductType.EUR
    ? <EurIcon className={ clsx(classes.formGroupCurrencyIcon, className) }/>
    : <EurXIcon className={ clsx(classes.formGroupCurrencyIcon, className) }/>;
});
