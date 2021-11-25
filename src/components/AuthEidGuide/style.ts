import { makeStyles, createStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(({ breakpoints }) => createStyles({
  container: {
    padding: '24px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E5E80',
    borderRadius: 12,

    [breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },

  logoContainer: {
    marginRight: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      marginRight: 0
    }
  },

  text: {
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
