import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) =>
  createStyles({
    container: {
      position: 'relative'
    },

    formGroup: {
      padding: '14px',
      border: '1px solid #133E57',
      borderRadius: '12px',
      borderColor: '#41748F'
    },

    formGroupFocused: {
      borderColor: palette.primary.main,
      backgroundColor: '#012438'
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

    formGroupInputNotEditable: {
      caretColor: 'transparent'
    },

    formGroupInputLong: {
      height: '90%',
      alignItems: 'flex-start !important'
    },

    formGroupLong: {
      height: 180
    },

    formGroupSuccessMessageText: {
      color: palette.success.main,
      fontSize: '14px',
      lineHeight: '17px'
    },

    label: {
      color: palette.text.secondary,
      fontSize: '14px !important',
      lineHeight: '14px !important',
      cursor: 'pointer'
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
      padding: '24px 0 0',
      marginTop: 10,
      position: 'absolute',
      zIndex: 999,

      '& $selectText': {
        marginLeft: 16
      }
    },

    selectPopupPointer: {
      cursor: 'pointer'
    },

    selectList: {
      paddingBottom: '24px',
      maxHeight: '250px',
      overflowY: 'auto'
    },

    selectChoseLabelText: {
      color: '#92B6CA'
    },

    selectNoItems: {
      padding: '0 24px 24px',
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
    },

    addItemHeaderButton: {
      height: '29px',
      borderRadius: '12px'
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
      textAlign: 'left',
      padding: '5px 24px',
      width: '100%',
      justifyContent: 'space-between',

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },

      '&:active': {
        backgroundColor: 'transparent'
      },

      '&:focus': {
        backgroundColor: 'transparent'
      }
    },

    listItemActive: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }),
)
