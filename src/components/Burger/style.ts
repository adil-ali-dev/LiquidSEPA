import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette, breakpoints }: Theme) => createStyles({
  burger: {
    padding: 0,
    display: 'none',
    alignItems: 'center',
    width: 23,
    minWidth: 23,
    height: '100%',
    '-webkit-transform': 'rotate(0deg)',
    '-moz-transform': 'rotate(0deg)',
    '-o-transform': 'rotate(0deg)',
    transform: 'rotate(0deg)',
    '-webkit-transition': '.5s ease-in-out',
    '-moz-transition': '.5s ease-in-out',
    '-o-transition': '.5s ease-in-out',
    transition: '.5s ease-in-out',

    '&:hover': {
      backgroundColor: 'transparent'
    },

    '& span': {
      position: 'relative',
      height: '18px'
    },

    [breakpoints.down(875)]: {
      display: 'flex'
    }
  },

  burgerOpen: {
    '& div:nth-child(1)': {
      left: 4,
      '-webkit-transform': 'rotate(45deg)',
      '-moz-transform': 'rotate(45deg)',
      '-o-transform': 'rotate(45deg)',
      transform: 'rotate(45deg)'
    },

    '& div:nth-child(2)': {
      width: 0,
      opacity: 0
    },

    '& div:nth-child(3)': {
      left: 4,
      '-webkit-transform': 'rotate(-45deg)',
      '-moz-transform': 'rotate(-45deg)',
      '-o-transform': 'rotate(-45deg)',
      transform: 'rotate(-45deg)'
    }
  },

  burgerItem: {
    display: 'block',
    position: 'absolute',
    height: '2px',
    width: '100%',
    backgroundColor: palette.text.primary,
    opacity: 1,
    left: 0,
    '-webkit-transform': 'rotate(0deg)',
    '-moz-transform': 'rotate(0deg)',
    '-o-transform': 'rotate(0deg)',
    transform: 'rotate(0deg)',
    '-webkit-transition': '.25s ease-in-out',
    '-moz-transition': '.25s ease-in-out',
    '-o-transition': '.25s ease-in-out',
    transition: '.25s ease-in-out',
    '-webkit-transform-origin': 'left center',
    '-moz-transform-origin': 'left center',
    '-o-transform-origin': 'left center',
    transformOrigin: 'left center',

    '&:nth-child(1)': {
      top: 0
    },

    '&:nth-child(2)': {
      top: 8
    },

    '&:nth-child(3)': {
      top: 16
    },
  }
}), { index: 1 });
