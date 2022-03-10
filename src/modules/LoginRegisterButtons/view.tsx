import React from 'react';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

import { withLoginAndRegisterButtonsDomain } from './domain';
import { useStyles } from './style';


export const LoginAndRegisterButtonsModule = withLoginAndRegisterButtonsDomain(({
  handleLoginClick,
  handleRegisterClick
}) => {
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
  )
});
