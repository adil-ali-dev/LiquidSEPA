import { isMobile } from 'react-device-detect';

import { withLoginAndRegisterButtonsDomain } from './domain';
import { LoginAndRegisterButtonsMobile } from './components/mobile';
import { LoginAndRegisterButtonsDesktop } from './components/desktop';


export const LoginAndRegisterButtonsModule = withLoginAndRegisterButtonsDomain(({
  loginUrl,
  registerUrl,
  handleLoginClick,
  handleRegisterClick
}) => {
  return isMobile ? (
    <LoginAndRegisterButtonsMobile
      loginUrl={loginUrl}
      registerUrl={registerUrl}
    />
  ) : (
    <LoginAndRegisterButtonsDesktop
      handleLoginClick={handleLoginClick}
      handleRegisterClick={handleRegisterClick}
    />
  );
});
