export type WrappedProps = DesktopProps & MobileProps;

export type DesktopProps = {
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
}

export type MobileProps = {
  registerUrl: string | null;
  loginUrl: string | null;
}
