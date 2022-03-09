import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  modal: {
    padding: '52px 32px',
    maxWidth: 495,
    flex: 1,
    width: 495,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [breakpoints.down('xs')]: {
      flex: 'unset',
      width: '100%'
    }
  },

  modalContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },

  brand: {
    width: 192,
    height: 64
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

  steps: {
    marginTop: 32,
    padding: 16,
    display: 'flex',
    maxWidth: 335,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E5E80',
    borderRadius: 12,

    [breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },

  stepsList: {
    margin: 0,
    paddingLeft: 16
  },

  step: {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#A1C9DE'
  },

  button: {
    marginTop: 32,
    maxWidth: 335,
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
}), { index: 1 });
