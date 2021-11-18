import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  modal: {
    padding: '52px 32px',
    maxWidth: 495,
    width: '100%'
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
    width: 429,
    marginTop: 32,
    height: 76
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
    color: palette.text.primary
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

  formGroup: {
    padding: '14px',
    border: '1px solid #41748F',
    borderRadius: '12px',
    backgroundColor: '#002C44',
    marginTop: 32,

    '&:focus-within': {
      borderColor: palette.primary.main,
      backgroundColor: '#012438'
    }
  },

  formGroupPlate: {
    backgroundColor: '#004765 !important',
    border: '1px solid #004765 !important',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  formGroupFixedHeight: {
    height: '80px'
  },

  formGroupError: {
    borderColor: `${ palette.error.main } !important`
  },

  formGroupSpace: {
    marginTop: '32px'
  },

  formGroupLong: {
    minHeight: '180px',
    cursor: 'default'
  },

  formGroupMedium: {
    marginTop: 12,
    minHeight: '125px',
    cursor: 'default'
  },

  formGroupBackground: {
    backgroundColor: '#012438'
  },

  commonLabel: {
    color: palette.text.secondary,
    fontSize: '14px !important',
    lineHeight: '14px !important',
    cursor: 'pointer'
  },

  formGroupInput: {
    flex: 1,
    marginTop: '6px',
    color: palette.text.primary,
    fontSize: '16px',
    lineHeight: '22px',
    width: '100%',

    '& div': {
      border: 'none'
    }
  },

  formGroupInputLong: {
    height: '90px',
    alignItems: 'flex-start !important'
  },

  formGroupInputMedium: {
    // height: 70
  },

  formGroupPlateVerifiedContainer: {
    display: 'flex',
    alignItems: 'center'
  },

  formGroupPlateVerifiedIcon: {
    marginRight: 7
  },

  formGroupPlateVerifiedText: {
    fontSize: '14px',
    lineHeight: '17px',
    color: palette.primary.main
  },

  formGroupRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  modalFlag: {
    marginRight: 14
  }
}));
