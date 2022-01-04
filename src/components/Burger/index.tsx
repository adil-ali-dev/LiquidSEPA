import React, { memo } from 'react';
import { Grid, Button } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Props } from './typedef';

export const Burger = memo<Props>(({ className, status, handleClick }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.burger, className, status && classes.burgerOpen)}
      onClick={handleClick}
      disableFocusRipple
      disableRipple
      disableTouchRipple
    >
      {Array.from({ length: 3 }, () => <Grid className={classes.burgerItem} />)}
    </Button>
  );
});
