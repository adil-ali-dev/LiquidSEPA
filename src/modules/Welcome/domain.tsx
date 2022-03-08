import { FC } from 'react';

import { WrappedProps } from './typedef';
import { useWelcomeContext } from '../../contexts/Welcome';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';


export const withWelcomeDomain = (Component: FC<WrappedProps>) => () => {
  const { modalStatus, controls } = useWelcomeContext();
  const { controls: addressModalControls } = useWhitelistAddressContext();

  return (
    <Component
      status={ !!modalStatus }
      handleClose={ controls.close }
      handleExited={ addressModalControls.open }
    />
  );
}
