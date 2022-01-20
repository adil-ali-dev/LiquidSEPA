import React, { memo } from 'react';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from '../style';
import { MobileProps } from '../typedef';


export const LoginAndRegisterButtonsMobile = memo<MobileProps>(({ loginUrl, registerUrl }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={ classes.button }
        href={loginUrl!}
        target="_blank"
        disabled={!loginUrl}
      >
        Login
      </Button>
      <Button
        className={ clsx(classes.button, classes.buttonRegister) }
        href={registerUrl!}
        target="_blank"
        disabled={!registerUrl}
      >
        Register
      </Button>
    </>
  );
});
