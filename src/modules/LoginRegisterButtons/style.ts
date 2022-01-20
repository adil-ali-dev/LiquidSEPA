import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  button: {
    minWidth: 107,
    height: 38,
    border: `1px solid ${ palette.primary.main }`,
    borderRadius: 12,
    fontSize: '16px',
    fontWeight: 500,

    '&:not(:last-child)': {
      marginRight: 24
    },

    '&.Mui-disabled': {
      color: palette.text.primary,
      opacity: 0.75
    },

    [breakpoints.down(875)]: {
      '&:not(:last-child)': {
        marginRight: 0
      },
    }
  },

  buttonRegister: {

    backgroundColor: palette.primary.main,
    border: 'none',

    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  }
}), { index: 1 });
