import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  modal: {
    padding: '52px 32px',
    maxWidth: 495,
    flex: 1,
    width: 495
  },

  modalHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  modalHeadline: {
    color: palette.text.primary,
    fontSize: 25,
    fontWeight: 500,
    lineHeight: '28px',
    textAlign: 'center'
  },

  modalSubHeadline: {
    marginTop: 12,
    color: palette.text.primary,
    fontSize: 16,
    lineHeight: '28px',
    textAlign: 'center'
  },

  modalContent: {
    marginTop: 32
  },

  modalIban: {
    marginTop: 2,
    color: palette.primary.main,
    fontSize: 16,
    lineHeight: '22px',
    textAlign: 'center'
  },

  modalSteps: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'space-between',
    width: 215,
    position: 'relative'
  },

  modalStepConnector: {
    position: 'absolute',
    top: 12,
    left: 49,
    width: 116,
    height: 1,
    backgroundColor: palette.primary.main
  },

  modalStepLabel: {
    marginTop: 8,
    color: palette.text.primary,
    fontSize: 17,
    fontWeight: 500,
    lineHeight: '20px'
  },

  modalInfoBank: {
    marginTop: 32,
    height: 76,
    width: 429
  },

  modalInfoOption: {
    display: 'flex',
    alignItems: 'center'
  },

  modalInfoOptionIcon: {
    marginRight: 16,
    width: 24,
    height: 24,
    borderRadius: 6,
    overflow: 'hidden'
  },

  modalInfoOptionLabel: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#142A36'
  },

  modalInfoContainer: {
    marginTop: 32,
    padding: 24,
    flex: 1,
    backgroundColor: '#04324A',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid transparent'
  },

  modalInfoContainerError: {
    border: `1px solid ${ palette.error.main }`
  },

  modalInfoIcon: {
    marginRight: 24
  },

  modalInfoHeadline: {
    color: palette.text.primary,
    fontSize: 17,
    fontWeight: 500,
    lineHeight: '28px'
  },

  modalInfoMessage: {
    color: '#56859F',
    fontSize: 15,
    lineHeight: '22px'
  },

  modalFooter: {
    marginTop: 12
  },

  modalFooterSpace: {
    marginTop: 20
  },

  modalFooterText: {
    color: '#56859F',
    fontSize: 15,
    lineHeight: '22px',
    wordWrap: 'break-word',
    minHeight: 53,
    maxHeight: 53
  },

  modalFooterTextSpace: {
    marginTop: 6
  },

  modalFooterLabel: {
    color: palette.primary.main,
    fontSize: 14,
    lineHeight: '17px'
  },

  modalFooterButton: {
    marginTop: 32
  },

  button: {
    marginTop: 32,
    padding: '17px 0 16px !important',
    fontSize: '18px !important',
    lineHeight: '21px !important',
    color: ` ${ palette.text.primary } !important`,
    // @ts-ignore
    textTransform: 'none !important',
    borderRadius: '12px !important',
    width: '100% !important',

    [breakpoints.down('xs')]: {
      marginTop: '25px !important'
    }
  },

  buttonIndicator: {
    color: palette.text.primary
  },

  header: {
    padding: '40px 32px 26px',
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      padding: '40px 20px 26px'
    }
  },

  modalFlag: {
    marginRight: 14
  },

  modalFlagItem: {
    width: 28,
    height: 28,
    borderRadius: 8
  },

  formGroup: {
    padding: '14px',
    border: '1px solid #41748F',
    borderRadius: '12px',
    backgroundColor: '#002C44',
    marginTop: 32,
    width: 429,

    '&:focus-within': {
      borderColor: palette.primary.main,
      backgroundColor: '#012438'
    },

    '& .MuiInputBase-root': {
      width: '100%'
    }
  },

  commonLabel: {
    color: palette.text.secondary,
    fontSize: '14px !important',
    lineHeight: '14px !important',
    cursor: 'pointer'
  },

  formGroupRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));
