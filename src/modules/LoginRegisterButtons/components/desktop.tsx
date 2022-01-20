import React, { memo } from 'react';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from '../style';
import { DesktopProps } from '../typedef';


export const LoginAndRegisterButtonsDesktop = memo<DesktopProps>(({ handleLoginClick, handleRegisterClick }) => {
  const classes = useStyles();

  return (
    <>
      <Button className={ classes.button } onClick={ handleLoginClick }>
        Login
      </Button>
      <Button
        className={ clsx(classes.button, classes.buttonRegister) }
        onClick={ handleRegisterClick }
      >
        Register
      </Button>
    </>
  );
});
