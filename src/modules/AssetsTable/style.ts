import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  assetsTable: {},

  assetsTableHeadCell: {
    padding: '15px 10px',
    flex: 1,
    color: palette.primary.main,
    fontSize: '15px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #28536C',

    [breakpoints.down('sm')]: {
      '&:nth-child(6n)': {
        display: 'none'
      },

      '&:nth-child(5n)': {
        display: 'none'
      }
    },

    [breakpoints.down('xs')]: {
      '&:nth-child(4n)': {
        display: 'none'
      }
    },

    [breakpoints.down(385)]: {
      '&:nth-child(2n)': {
        display: 'none'
      }
    }
  },

  assetsTableRow: {
    display: 'flex',
    position: 'relative'
  },

  assetsTableBodyCell: {
    padding: '24px 10px',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    color: palette.text.primary,
    fontSize: '18px',
    lineHeight: '21px',
    borderBottom: '1px solid #28536C',

    [breakpoints.down('sm')]: {
      '&:nth-child(5n)': {
        display: 'none'
      },

      '&:nth-child(6n)': {
        display: 'none'
      },
    },

    [breakpoints.down('xs')]: {
      '&:nth-child(4n)': {
        display: 'none'
      }
    },

    [breakpoints.down(385)]: {
      '&:nth-child(2n)': {
        display: 'none'
      }
    }
  },

  assetsTableBodyCellLoading: {
    padding: '28px 10px'
  },

  assetsTableBodyCellIconContainer: {
    marginRight: '8px',
    width: '29px',
    height: '29px'
  },

  assetsTableBodyCellIcon: {
    width: '100%',
    height: '100%'
  },

  assetsTableBodyCellLink: {
    color: palette.text.primary,
    textDecoration: 'underline'
  },

  assetsTableBodyCellLinkIssuer: {
    display: 'flex',
    width: '100%',
    height: '16px',
    maxWidth: '75px'
  },

  assetsTableBodyCellLinkImg: {
    width: '100%',
    height: '100%'
  },

  comingSoon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',

    [breakpoints.down('sm')]: {
      top: 'unset',
      bottom: 0,
      right: '50%',
      transform: 'translateX(50%)'
    },

    [breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}), { index: 1 });
