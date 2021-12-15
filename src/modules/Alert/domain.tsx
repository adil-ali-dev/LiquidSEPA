import React, { FC, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './typedef';
import { alertActions, alertDataSelector } from '../../store/Alert';


export const withAlertDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(false);

  const alert = useSelector(alertDataSelector);

  useEffect(() => {
    if (!alert) return;

    setStatus(true);
  }, [alert?.message])

  const handleClose = useCallback(() => {
    setStatus(false);
  }, []);

  const handleExited = useCallback(() => {
    dispatch(alertActions.hide());
  }, []);

  return (
    <Component
      text={ alert?.message }
      type={ alert?.type }
      status={ status }
      btnText={ alert?.button || 'OK' }
      handleClose={ handleClose }
      handleExited={ handleExited }
      handleButtonClick={ alert?.onButtonPress || handleClose }
    />
  )
};
