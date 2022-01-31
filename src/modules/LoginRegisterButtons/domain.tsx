import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { WrappedProps } from './typedef';
import { socketStatusSelector } from '../../store/Socket';
import { sessionActions, sessionLoginRequestIdSelector, sessionLoginUrlSelector, sessionRegisterRequestIdSelector, sessionRegisterUrlSelector } from '../../store/Session';
import { useSessionContext } from '../../contexts/Session';


export const withLoginAndRegisterButtonsDomain = (Component: FC<WrappedProps>) => () => {
  const dispatch = useDispatch();

  const socketStatus = useSelector(socketStatusSelector);
  const loginUrl = useSelector(sessionLoginUrlSelector);
  const registerUrl = useSelector(sessionRegisterUrlSelector);
  const loginRequestId = useSelector(sessionLoginRequestIdSelector);
  const registerRequestId = useSelector(sessionRegisterRequestIdSelector);

  const { controls } = useSessionContext();

  useEffect(() => {
    if (!isMobile || !socketStatus) return;

    dispatch(sessionActions.createSession());
    dispatch(sessionActions.createAccount());
  }, [isMobile, socketStatus]);

  useEffect(() => {
    if (isMobile) return;

    if (loginRequestId) {
      dispatch(sessionActions.cancelAuthEid({ requestId: loginRequestId }));
    }

    if (registerRequestId) {
      dispatch(sessionActions.cancelAuthEid({ requestId: registerRequestId }));
    }
  }, [isMobile]);

  const handleLoginClick = useCallback(() => {
    controls.openLogin(loginUrl);
  }, [loginUrl]);

  const handleRegisterClick = useCallback(() => {
    controls.openRegister(registerUrl);
  }, [registerUrl]);

  return (
    <Component
      handleLoginClick={handleLoginClick}
      handleRegisterClick={handleRegisterClick}
    />
  );
}
