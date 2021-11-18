import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 75
  },

  label: {
    marginTop: 8,
    color: palette.text.primary,
    fontSize: 17,
    fontWeight: 500,
    lineHeight: '20px'
  },

  labelInactive: {
    color: '#56859F'
  }
}));
