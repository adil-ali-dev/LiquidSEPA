import React, { ChangeEvent, FC, FormEvent, useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';
import { Props } from './typedef';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useWhitelistedAddress } from '../../graphql/WhitelistAddress/hooks';
import { SuccessAlertModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';
import { useAuthEidLogin } from '../../graphql/Session/hooks';
import { useSessionContext } from '../../contexts/Session';
import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';


export const withLoginDomain = (Component: FC<Props>) => () => {
  const [error, setError] = useState<null | string>(null);

  const authEid = useAuthEidLogin(() => create());

  const { status, create, statusLoginModal, controls } = useSessionContext();

  useEffect(() => {
    if (statusLoginModal) {
      authEid.authEidLogin();
    } else {
      authEid.stopPolling?.();
    }
  }, [statusLoginModal]);

  useEffect(() => {
    if (!authEid.error) return;

    setError(authEid.error);
  }, [authEid.error]);

  useEffect(() => {
    if (!error) return;

    controls.closeLogin();
  }, [error]);

  const qrValue = useMemo(() => {
    if (!authEid.requestId) return null;

    return `${ AUTH_EID_URL_REQ_PREFIX }${ authEid.requestId }`;
  }, [authEid.requestId]);

  const handleErrorClose = useCallback(() => {
    setError(null);
  }, []);

  return (
    <>
      <Component
        status={ statusLoginModal }
        handleClose={ controls.closeLogin }
        loading={ authEid.loading || authEid.waiting || status }
        qrValue={ qrValue }
      />
      <SuccessAlertModal
        text={ error }
        type={ StatusModalType.ERROR }
        status={ !!error }
        handleClose={ handleErrorClose }
        handleButtonClick={ handleErrorClose }
      />
    </>

  );
};
