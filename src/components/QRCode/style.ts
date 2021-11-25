import { makeStyles, createStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(() => createStyles({
  container: {
    marginTop: '24px',
    height: 212,
    width: 212,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  containerBackground: {
    backgroundColor: '#FFF'
  },
}));
