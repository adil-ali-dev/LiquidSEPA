import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },

  icon: {
    marginTop: 14
  },

  modalHeadline: {
    marginTop: 24,
    color: palette.text.primary,
    fontSize: 25,
    fontWeight: 500,
    lineHeight: '28px',
    textAlign: 'center',
    maxWidth: 285
  },

  modalFooterButton: {
    marginTop: 48
  },

  button: {
    marginTop: 32,
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
  }
}));
