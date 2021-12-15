import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { RubikLight, RubikRegular, RubikMedium, RubikBold } from './fonts';

const palette = {
  primary: {
    main: '#00B4E9',
    dark: '#0084AB'
  },
  error: {
    main: '#FF717A'
  },
  success: {
    main: '#00E9A3'
  },
  text: {
    primary: '#FFF',
    secondary: '#56859F',
    lightBlue: '#00B4E9'
  },
  background: {
    default: '#092640',
    paper: '#002C44'
  }
};

const createdTheme = createMuiTheme({
  typography: {
    fontFamily: "'Rubik', sans-serif"
  },
  palette,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [RubikLight, RubikRegular, RubikMedium, RubikBold]
      }
    },
    MuiTypography: {
      body1: {}
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      },
      containedPrimary: {
        '&$disabled': {
          backgroundColor: palette.primary.main,
          opacity: 0.65
        }
      },
      contained: {
        boxShadow: 'none',

        '&:hover': {
          boxShadow: 'none'
        },

        '&:active': {
          boxShadow: 'none'
        },

        '&$disabled': {
          color: palette.text.primary
        }
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiListItem: {
      root: {
        width: 'unset',
        paddingTop: 0,
        paddingBottom: 0
      },
      gutters: {
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 0
      }
    },
    MuiListItemText: {
      root: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    MuiInputBase: {
      input: {
        padding: 0
      },

      root: {
        '&$disabled': {
          color: palette.text.primary,
          cursor: 'pointer'
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#073F5E'
      },
      rounded: {
        borderRadius: 24
      }
    },
    // @ts-ignore
    MuiAutocomplete: {
      root: {
        '& input': {
          paddingLeft: 0,
          paddingRight: 0
        },

        '& .MuiInputBase-root': {
          border: 'none',
          borderRadius: 0,

          '& fieldset': {
            display: 'none'
          }
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          padding: 0
        }
      },
      popper: {
        marginTop: '10px'
      },
      paper: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        boxShadow: 'none',
        marginTop: 14
        // borderTop: 'none',
        // borderTopLeftRadius: 0,
        // borderTopRightRadius: 0
      },
      noOptions: {
        color: palette.text.secondary,
        fontSize: '0.9rem',
        padding: 0
      },
      loading: {
        color: palette.text.secondary,
        fontSize: '0.9rem',
        padding: 0
      },
      option: {
        color: palette.text.primary,
        fontSize: '0.9rem',
        minHeight: '40px',

        '&:focused': {
          backgroundColor: 'transparent'
        },

        '&:active': {
          backgroundColor: 'transparent'
        },

        '&[data-focus="true"]': {
          color: palette.primary.main
        },

        '&[aria-selected="true"]': {
          color: palette.text.primary
        }
      }
    }
  }
});

export const theme = responsiveFontSizes(createdTheme);
