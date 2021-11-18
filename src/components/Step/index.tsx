import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { Props } from './typedef';
import { ActiveIcon, DoneIcon, ErrorIcon, InactiveIcon } from '../../assets/Icons';
import { useStyles } from './style';

export const Step = memo<Props>(({
  error,
  active,
  completed,
  label
}) => {
  const styles = useStyles();

  return (
    <Grid className={ styles.container }>
      { error && <ErrorIcon/> }
      { (active && !completed && !error) && <ActiveIcon/> }
      { (!active && !completed && !error) && <InactiveIcon/> }
      { (completed && !error) && <DoneIcon/> }
      <Typography className={ clsx(styles.label, (!active && !error) && styles.labelInactive) }>
        { label }
      </Typography>
    </Grid>
  );
});
