import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
  createStyles({
    formGroup: {
      padding: '14px',
      border: '1px solid #133E57',
      borderRadius: '12px',

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

    formGroupBackground: {
      backgroundColor: '#012438'
    },

    formGroupFixedHeight: {
      height: '80px'
    },

    formGroupError: {
      borderColor: `${palette.error.main} !important`
    },

    formGroupSpace: {
      marginTop: '32px'
    },

    formGroupLong: {
      minHeight: '180px',
      cursor: 'default'
    },

    formGroupMedium: {
      marginTop: 32,
      minHeight: '125px',
      cursor: 'default'
    },

    commonLabel: {
      color: palette.text.secondary,
      fontSize: '14px !important',
      lineHeight: '14px !important',
      cursor: 'pointer'
    },

    commonLabelHeight: {
      lineHeight: '20px !important'
    },

    commonLabelSpace: {
      marginTop: '17px'
    },

    formGroupTextValue: {
      marginTop: '8px',
      color: palette.text.primary,
      fontSize: '16px',
      lineHeight: '20px',
      width: '100%',
      overflowWrap: 'break-word'
    },

    formGroupRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    formGroupCurrency: {
      marginTop: '10px',
      marginRight: '15px',
      display: 'flex',
      alignItems: 'center'
    },

    formGroupCurrencyIconContainer: {
      marginRight: '6px',
      width: '22px',
      height: '22px'
    },

    formGroupCurrencyIcon: {
      width: '100%',
      height: '100%'
    },

    formGroupCurrencyIconText: {
      width: '1em',
      height: '1em',
      position: 'absolute',
      top: '3px',
      left: '5px'
    },

    formGroupCurrencyText: {
      color: palette.text.primary,
      fontSize: '20px',
      lineHeight: '24px'
    },

    formGroupText: {
      color: palette.text.primary,
      fontSize: '30px !important',
      // @ts-ignore
      fontWeight: '300 !important',
      lineHeight: '36px !important',
      flex: 1
    },

    formGroupTextInput: {
      textAlign: 'right'
    },

    formGroupTextInputDisabled: {
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

    formGroupSuccessMessage: {
      marginTop: '16px',
      display: 'flex'
    },

    formGroupSuccessMessageIcon: {
      marginRight: '7px',
      marginTop: '3px',
      width: '12px',
      height: '10px'
    },

    formGroupSuccessMessageText: {
      color: palette.success.main,
      fontSize: '14px',
      lineHeight: '17px'
    },

    swapContainer: {
      padding: '20px 14px 0',
      display: 'flex',
      alignItems: 'center'
    },

    swapButton: {
      color: `${palette.text.primary} !important`,
      marginRight: '12px !important',
      padding: '10px !important',
      borderRadius: '40px !important',
      minWidth: 'unset !important'
    },

    swapButtonIcon: {
      width: '20px',
      height: '20px'
    },

    swapText: {
      color: '#39637B',
      fontSize: '14px',
      lineHeight: '16px'
    },

    formErrorContainer: {
      paddingTop: '10px',
      height: '29px'
    },

    formErrorText: {
      color: palette.error.main,
      fontSize: '14px',
      lineHeight: '17px'
    },

    button: {
      padding: '17px 0 16px !important',
      fontSize: '18px !important',
      lineHeight: '21px !important',
      color: ` ${palette.text.primary} !important`,
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

    headerButton: {
      minWidth: '0 !important',
      marginRight: '24px !important',
      color: `${palette.primary.main} !important`,

      '&:hover': {
        backgroundColor: 'transparent !important'
      }
    },

    headerButtonIconContainer: {
      width: '12px',
      height: '21px'
    },

    headerButtonIcon: {
      width: '12px',
      height: '21px'
    },

    headerText: {
      color: palette.text.primary,
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '28px'
    },

    headerTextIconContainer: {
      display: 'inline-flex',
      alignSelf: 'center',
      position: 'relative',
      height: '20px',
      width: '30px'
    },

    details: {
      backgroundColor: '#012438'
    },

    detailsAddress: {
      padding: '32px 32px 24px',

      [breakpoints.down('md')]: {
        padding: '20px'
      }
    },

    detailsAddressContainer: {
      display: 'flex'
    },

    detailsQRContainer: {
      marginRight: '24px',
      width: '160px',
      height: '160px',
      backgroundColor: '#FFF',
      padding: '12px',
      borderRadius: '8px',

      [breakpoints.down('md')]: {
        display: 'none'
      }
    },

    detailsAddressInfo: {
      maxWidth: '247px',

      [breakpoints.down('md')]: {
        maxWidth: '100%'
      }
    },

    detailsAddressText: {
      fontSize: '17px',
      lineHeight: '24px',
      wordWrap: 'break-word'
    },

    detailsAddressPaymentLinkButton: {
      marginTop: '16px !important',
      padding: '10px 20px',
      border: `1px solid ${palette.primary.main} !important`,
      borderRadius: '12px',
      width: '100% !important',
      color: `${palette.primary.main} !important`,
      display: 'none',

      [breakpoints.down('md')]: {
        display: 'flex'
      }
    },

    detailsAddressCopyButton: {
      marginTop: '16px !important',
      padding: '10px 20px',
      border: `1px solid ${palette.primary.main} !important`,
      borderRadius: '12px',
      width: '100% !important',
      color: `${palette.primary.main} !important`
    },

    detailsAddressCopyIconContainer: {
      marginRight: '8px',
      width: '14px',
      height: '16px'
    },

    detailsAddressExploreIconContainer: {
      marginRight: '8px',
      width: '18px',
      height: '18px'
    },

    detailsAddressCopyIcon: {
      width: '100%',
      height: '100%'
    },

    detailsBank: {
      padding: '22px 32px 26px 32px',

      [breakpoints.down('md')]: {
        padding: '22px 20px 22px'
      }
    },

    detailsBankCopyIcon: {
      marginLeft: '10px',
      width: '16px',
      height: '16px'
    },

    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },

    rowSpaceSmall: {
      marginTop: '8px'
    },

    rowSpaceMedium: {
      marginTop: '18px'
    },

    spaceLarge: {
      marginTop: '32px'
    },

    rowText: {
      color: palette.text.primary,
      fontSize: '16px',
      lineHeight: '24px'
    },

    detailsBankRowButton: {
      padding: '4px 8px',
      borderRadius: '4px'
    },

    detailsBankWarningContainer: {
      marginTop: '14px',
      padding: '6px 20px',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#002C44'
    },

    detailsBankWarningHeader: {
      display: 'flex',
      alignItems: 'center'
    },

    detailsBankWarningIconContainer: {
      marginRight: '8px',
      width: '18px',
      height: '16px'
    },

    detailsBankWarningIcon: {
      width: '100%',
      height: '100%'
    },

    detailsBankWarningText: {
      color: palette.primary.main,
      fontSize: '14px',
      lineHeight: '22px'
    },

    footer: {
      padding: '32px',
      minHeight: '273px',

      [breakpoints.down('md')]: {
        padding: '32px 20px'
      }
    },

    footerAddress: {
      minHeight: '239px'
    },

    footerText: {
      color: palette.text.secondary,
      fontSize: '14px',
      lineHeight: '20px',
      wordWrap: 'break-word'
    },

    footerTextSpace: {
      marginTop: '16px'
    },

    payment: {
      minHeight: '515px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },

    paymentHeader: {
      padding: '32px',

      [breakpoints.down('xs')]: {
        padding: '32px 20px'
      }
    },

    paymentHeaderRow: {
      display: 'flex',
      alignItems: 'center'
    },

    paymentHeaderIcon: {
      width: '16px',
      height: '13px',
      fill: palette.text.primary
    },

    paymentHeaderIconContainer: {
      marginRight: '14px',
      width: '40px',
      height: '40px',
      borderRadius: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    paymentHeaderIconContainerBorder: {
      border: `1px solid ${palette.primary.main}`
    },

    paymentHeaderIconContainerBackground: {
      backgroundColor: palette.primary.main
    },

    paymentHeaderIconBlue: {
      color: palette.primary.main
    },

    paymentHeaderText: {
      color: palette.text.primary,
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '28px'
    },

    paymentDetails: {
      padding: '32px',
      backgroundColor: palette.background.default,
      flex: 1,

      [breakpoints.down('xs')]: {
        padding: '32px 20px'
      }
    },

    paymentDetailsHeadline: {
      color: palette.primary.main,
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: 1
    },

    paymentDetailsDivider: {
      marginTop: '16px',
      height: '1px',
      width: '100%',
      backgroundColor: palette.primary.main
    },

    paymentDetailsContent: {
      marginTop: '22px'
    },

    paymentDetailsItem: {
      '&:nth-child(1n):not(:nth-child(1))': {
        marginTop: '24px'
      }
    },

    paymentDetailsItemButtons: {
      marginTop: '12px',
      display: 'flex',
      justifyContent: 'space-between',

      [breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },

    paymentDetailsItemButton: {
      flex: '1 !important',
      borderRadius: '12px',
      border: `1px solid ${palette.primary.main} !important`,
      color: `${palette.primary.main} !important`,

      '&:first-child': {
        marginRight: '10px'
      },

      [breakpoints.down('xs')]: {
        '&:first-child': {
          marginRight: 0
        },

        '&:last-child': {
          marginTop: '10px'
        }
      }
    },

    paymentDetailsItemAmount: {
      marginTop: '12px',
      display: 'flex',
      alignItems: 'center'
    },

    paymentDetailsItemAmountText: {
      color: palette.text.primary,
      fontSize: '16px',
      lineHeight: '24px'
    },

    paymentDetailsItemAmountIcon: {
      marginRight: '8px',
      width: '20px',
      height: '20px'
    },

    rowProduct: {
      display: 'flex',
      alignItems: 'center'
    },

    paymentDetailsItemText: {
      color: palette.text.primary,
      fontSize: '16px',
      lineHeight: '24px',
      width: '100%',
      overflowWrap: 'break-word'
    },

    paymentDetailsTxid: {
      maxWidth: '355px',

      [breakpoints.down('xs')]: {
        maxWidth: '80%'
      }
    },

    separator: {
      width: '100%',
      height: 1,
      backgroundColor: '#366883',
      marginTop: 32
    },

    select: {
      position: 'relative',
      height: 180,
      paddingRight: 40
    },

    selectActive: {
      borderColor: palette.primary.main,
      backgroundColor: '#012438'
    },

    selectIconWrap: {
      position: 'absolute',
      top: 34,
      right: 12,
    },

    selectIconRotated: {
      transform: 'rotate(180deg)',
      fill: '#69C2F3 !important'
    },

    selectIcon: {
      fill: '#41738F'
    },

    selectText: {
      marginTop: 7,
      wordBreak: 'break-word'
    },



    selectPopup: {
      width: '100%',
      backgroundColor: '#FFF',
      borderRadius: 12,
      color: '#142A36',
      padding: '24px 0',
      marginTop: 10,
      position: 'absolute',
      zIndex: 999,

      '& $selectText': {
        marginLeft: 16
      }
    },

    selectChoseLabelText: {
      color: '#92B6CA'
    },

    selectNoItems: {
      padding: '0 30px',
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
      height: '50px',
      background: '#00B4E9',
      borderRadius: '12px',
      color: '#FFF',
      width: '100%',
      marginTop: 24
    },

    pointer: {
      cursor: 'pointer'
    },

    listHeading: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px',
      marginBottom: 24,

      '& $selectText': {
        margin: 0
      },

      '& $addItemButton': {
        width: 'auto',
        marginTop: 0
      }
    },

    listItem: {
      marginTop: 24,
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer'
    },

    listItemHeading: {
      fontSize: '16px',
      lineHeight: '19px',
      color: '#142A36',
      marginBottom: 8
    },

    listItemText: {
      fontSize: '16px',
      lineHeight: '19px',
      color: '#658698'
    },

    listItemTextWrap: {
      maxWidth: '80%',
      wordBreak: 'break-word'
    },

    listItemMoreButton: {},
    unauthNotice: {
      marginTop: 0
    }
  }),
)
