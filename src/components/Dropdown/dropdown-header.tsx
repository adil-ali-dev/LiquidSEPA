import React, { FC } from 'react';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownHeaderProps } from './typedef';

export const DropdownHeader: FC<DropdownHeaderProps> = ({
  text,
  buttonText,
  close,
  handleButtonClick,
}) => {
  const classes = useStyles();

  const handleClick = () => {
    handleButtonClick?.();
    close();
  };

  return (
    <Grid className={ classes.listHeading }>
      <Typography
        className={ clsx(classes.selectText, classes.selectChoseLabelText) }
      >
        { text }
      </Typography>
      {
        buttonText && (
          <Button
            className={ clsx(classes.addItemButton, classes.addItemHeaderButton) }
            variant="contained"
            color="primary"
            onClick={ handleClick }
          >
            { buttonText }
          </Button>
        )
      }
    </Grid>
  )
}
