import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  container: {
    backgroundColor: palette.background.paper
  },

  wrapper: {
    margin: '0 auto',
    padding: '40px 30px',
    maxWidth: '1380px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      padding: '40px 20px',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },

  list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '480px',
    width: '100%',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },

  listItemSpace: {
    [breakpoints.down('md')]: {
      marginTop: '14px'
    }
  },

  listItemIconContainer: {
    paddingRight: '8px'
  },

  listItemIcon: {
    fill: palette.text.primary,
    maxWidth: '23px',
    maxHeight: '22px',
    width: '100%',
    height: '100%'
  },

  listItemText: {
    color: palette.text.primary,
    fontSize: '14px',
    lineHeight: '24px',
    textDecoration: 'none'
  },

  copyText: {
    color: palette.text.primary,
    fontSize: '14px',
    lineHeight: '24px',
    opacity: 0.5,

    [breakpoints.down('md')]: {
      marginTop: '16px'
    }
  }
}));
