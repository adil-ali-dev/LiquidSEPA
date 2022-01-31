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

    [breakpoints.down('md')]: {
      backgroundAttachment: 'none'
    }
  },

  introSection: {
    padding: '10px 0 80px'
  },

  introWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    [breakpoints.down('md')]: {
      padding: 0,
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

    [breakpoints.down('md')]: {
      padding: '142px 20px 0',
      textAlign: 'center'
    },

    [breakpoints.down('xs')]: {
      fontSize: '48px',
      lineHeight: '54px'
    }
  },

  introSubHeadline: {
    paddingTop: '24px',
    color: palette.text.primary,
    fontSize: '28px',
    lineHeight: '33px',
    fontWeight: 300,

    [breakpoints.down('md')]: {
      textAlign: 'center'
    },

    [breakpoints.down('xs')]: {
      fontSize: '18px',
      lineHeight: '29px'
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

  assetsSection: {
    padding: '50px 0 100px',
    backgroundColor: palette.background.default
  }
}), { index: 1 });
