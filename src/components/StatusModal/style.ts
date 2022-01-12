import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  modal: {
    padding: '52px 32px',
    maxWidth: 495,
    flex: 1,
    width: 495
  },

  modalContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },

  icon: {
    marginTop: 14
  },

  modalHeadline: {
    marginTop: 32,
    color: palette.text.primary,
    fontSize: 25,
    fontWeight: 500,
    lineHeight: '28px',
    textAlign: 'center',
    maxWidth: 285
  },

  modalMessage: {
    marginTop: 24,
    color: palette.text.secondary,
    fontSize: 16,
    lineHeight: '24px',
    textAlign: 'center',
    maxWidth: 300
  },

  button: {
    marginTop: 48,
    padding: '17px 0 16px !important',
    fontSize: '18px !important',
    lineHeight: '21px !important',
    color: ` ${ palette.text.primary } !important`,
    // @ts-ignore
    textTransform: 'none !important',
    borderRadius: '12px !important',
    width: '100% !important',

    [breakpoints.down('xs')]: {
      marginTop: '25px !important'
    }
  },

  buttonIndicator: {
    color: palette.text.primary
  }
}), { index: 1 });
