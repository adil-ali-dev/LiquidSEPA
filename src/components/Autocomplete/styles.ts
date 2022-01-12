import { makeStyles, createStyles } from '@material-ui/core/styles'

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
    position: 'relative',
    padding: '14px 0',
    borderRadius: '12px',
    border: '1px solid #41748F',
    backgroundColor: '#012438',
    boxShadow: '0px 0px 0px 1px #012438 inset',

    '&:focus-within': {
      border: `1px solid ${palette.primary.main}`,

      '& .MuiIconButton-root': {
        color: palette.primary.main
      }
    },

    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      padding: 0,
      paddingTop: 6,
      paddingLeft: 14
    },

    '& .MuiIconButton-root': {
      color: '#41748F'
    }
  },

  inputContainer: {
    display: 'flex',
    alignItems: 'center'
  },

  input: {
    flex: 1,
    marginTop: '6px',
    color: palette.text.primary,
    fontSize: '16px',
    lineHeight: '22px',
    width: '100%',
    padding: '0 14px',

    '& div': {
      border: 'none'
    }
  },

  modalFlag: {
    marginRight: 14
  },

  modalInfoOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 18px',
    marginBottom: 14,
    cursor: 'pointer'
  },

  modalInfoOptionIcon: {
    marginRight: 16,
    width: 24,
    height: 24,
    borderRadius: 6,
    overflow: 'hidden'
  },

  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: '100%'
  },

  modalInfoOptionLabel: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#142A36'
  },

  popup: {
    overflowY: 'scroll',
    maxHeight: 400
  },

  selectNoItems: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  selectNoItemsNotice: {
    color: '#142A36',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px'
  },

  addItemButton: {
    marginTop: '24px',
    height: '50px',
    background: '#00B4E9',
    borderRadius: '12px',
    color: '#FFF',
    width: '100%'
  }
}), { index: 1 })
