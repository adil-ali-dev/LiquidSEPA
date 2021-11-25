import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  modal: {
    padding: '52px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  headline: {
    fontWeight: 500,
    fontSize: '25px',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#FFFFFF'
  },

  guide: {
    marginTop: '24px',
  },

  footerText: {
    marginTop: 16,
    fontSize: '14px',
    lineHeight: '22px',
    color: '#A1C9DE',

    [breakpoints.down('md')]: {
      '&:not(:last-child)': {
        marginBottom: 8
      }
    }
  },
}));
