import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WrappedProps } from './typedef';
import { sessionActions, sessionStatusSelector, sessionWelcomeMessageStatusSelector } from '../../store/Session';


export const withWelcomeDomain = (Component: FC<WrappedProps>) => () => {
  const dispatch = useDispatch();

  const sessionStatus = useSelector(sessionStatusSelector);
  const welcomeMessageStatus = useSelector(sessionWelcomeMessageStatusSelector);

  const visible = useMemo(() => {
    return !!sessionStatus && !welcomeMessageStatus;
  }, [sessionStatus, welcomeMessageStatus]);

  const handleClose = useCallback(() => {
    dispatch(sessionActions.updateWelcomeMessageStatus({ status: true }));
  }, []);

  return (
    <Component
      status={visible}
      handleClose={handleClose}
    />
  );
}
