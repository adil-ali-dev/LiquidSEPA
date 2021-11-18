import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 75
  },

  label: {
    padding: '0 14px',
    color: palette.text.secondary,
    fontSize: '14px !important',
    lineHeight: '14px !important',
    cursor: 'pointer'
  },

  formGroup: {
    padding: '14px 0',
    borderRadius: '12px',
    backgroundColor: '#012438',
    boxShadow: '0px 0px 0px 1px #012438 inset',

    '&:focus-within': {
      boxShadow: `0px 0px 0px 1px ${ palette.primary.main } inset`
    },

    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      padding: 0,
      paddingTop: 6,
      paddingLeft: 14
    },

    '& .MuiIconButton-root': {
      color: palette.text.primary
    }
  },

  inputContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));
