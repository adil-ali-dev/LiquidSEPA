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
    }
  },

  assetsTableRow: {
    display: 'flex'
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
    color: 'transparent',
    display: 'flex',
    width: '100%',
    height: '16px'
  }
}));
