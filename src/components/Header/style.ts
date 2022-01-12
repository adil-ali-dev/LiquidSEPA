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
    padding: '30px 0 10px',
    '-webkit-transition': '.5s ease-in-out',
    '-moz-transition': '.5s ease-in-out',
    '-o-transition': '.5s ease-in-out',
    transition: '.5s ease-in-out',

    [breakpoints.down(875)]: {
      height: '64px',
      overflowY: 'hidden'
    }
  },

  headerOpen: {
    height: 'calc(100vh - 40px)'
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
    },

    [breakpoints.down(875)]: {
      flexDirection: 'column',
      height: '100%'
    }
  },

  headerWrapperMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },

  headerLogoLink: {
    width: '175px',
    height: '32px',
    color: 'transparent',
    backgroundImage: 'url(/brand.svg)',
    backgroundRepeat: 'no-repeat',

    [breakpoints.down(875)]: {
      height: 24
    }
  },

  headerLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down(875)]: {
      display: 'none',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '100%'
    }
  },

  headerLinksOpen: {
    display: 'flex'
  },

  headerLink: {
    color: palette.text.primary,
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    marginRight: 28,

    '&:hover': {
      color: palette.primary.main
    },

    [breakpoints.down(875)]: {
      marginRight: 0
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
    },

    [breakpoints.down(875)]: {
      marginLeft: 0,
    }
  },

  headerLogoIcon: {
    width: '100%',
    height: '100%'
  }
}), { index: 1 });
