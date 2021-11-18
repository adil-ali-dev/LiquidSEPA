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
    width: '183px',
    height: '41px',
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
  },

  registerModal: {
    padding: '52px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  registerHeading: {
    fontWeight: 500,
    fontSize: '25px',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#FFFFFF'
  },

  registerQrWrapper: {
    height: 212,
    width: 212,
    background: '#FFF',
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: '24px auto'
  },

  registerQrEmpty: {
    backgroundColor: 'transparent'
  },

  registerInfoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E5E80',
    borderRadius: 12,
    padding: '24px 20px',

    [breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },

  registerInfoBoxIconWrap: {
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      marginRight: 0
    }
  },

  registerInfoBoxText: {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#A1C9DE',

    [breakpoints.down('md')]: {
      '&:not(:last-child)': {
        marginBottom: 8
      }
    }
  },

  noAppNotice: {
    marginTop: 16
  }
}));
