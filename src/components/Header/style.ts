import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  headerContainer: {
    // paddingTop: '20px'
    // backdropFilter: 'blur(13px)',
    // position: 'sticky',
    // zIndex: 1,
    // top: -20
  },

  header: {
    padding: '30px 0 10px'
  },

  headerWrapper: {
    margin: '0 auto',
    padding: '0 30px',
    maxWidth: '1380px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      padding: '0 20px'
    }
  },

  headerLogoLink: {
    width: '175px',
    height: '32px',
    color: 'transparent',
    backgroundImage: 'url(/brand.svg)'
  },

  headerLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerLink: {
    color: palette.text.primary,
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    marginRight: 28,

    '&:hover': {
      color: palette.primary.main
    }
  },

  headerButton: {
    minWidth: 107,
    height: 38,
    border: `1px solid ${ palette.primary.main }`,
    borderRadius: 12,
    fontSize: '16px',
    fontWeight: 500
  },

  registerButton: {
    marginLeft: 24,
    backgroundColor: palette.primary.main,
    border: 'none',

    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  },

  headerLogoIcon: {
    width: '100%',
    height: '100%'
  }
}));
