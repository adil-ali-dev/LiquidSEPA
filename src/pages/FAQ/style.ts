import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  wrapper: {
    margin: '0 auto',
    padding: '0 30px',
    maxWidth: '1380px',
    position: 'relative',
    width: '100%',

    [breakpoints.down('md')]: {
      padding: '0 20px'
    }
  },

  page: {
    backgroundImage: 'url(/static/media/home-background.png)',
    backgroundAttachment: 'fixed',
    backgroundPositionY: '500px',

    [breakpoints.down('md')]: {
      backgroundSize: 'cover'
    }
  },

  headerContainer: {
    paddingTop: '20px',
    backdropFilter: 'blur(13px)',
    position: 'sticky',
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0
  },

  introSection: {
    padding: '10px 0 80px'
  },

  introWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

  introHeadline: {
    paddingTop: '142px',
    color: palette.text.primary,
    fontSize: '63px',
    fontWeight: 500,
    lineHeight: '80px',
    maxWidth: '665px',
    width: '100%',

    [breakpoints.down('md')]: {
      textAlign: 'center'
    },

    [breakpoints.down('xs')]: {
      fontSize: '32px',
      lineHeight: '44px'
    }
  },

  introForm: {
    width: '495px',

    [breakpoints.down('md')]: {
      marginTop: '70px',
      display: 'flex',
      justifyContent: 'center'
    },

    [breakpoints.down('xs')]: {
      width: '100%'
    }
  },

  main: {
    padding: '80px 0 120px',
    backgroundColor: palette.background.default
  },

  sectionSpace: {
    marginTop: '64px'
  },

  sectionHeadline: {
    color: palette.text.primary,
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: '47px'
  },

  sectionList: {
    margin: '32px 0 0',
    paddingLeft: '21px'
  },

  sectionText: {
    color: palette.text.secondary,
    fontSize: '18px',
    lineHeight: '32px'
  },

  sectionTextSpaceMain: {
    marginTop: '32px'
  },

  sectionTextSpaceMedium: {
    marginTop: '24px'
  }
}));
