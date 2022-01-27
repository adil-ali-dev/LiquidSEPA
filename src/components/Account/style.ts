import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }) => createStyles({
  container: {
    display: 'flex',
    width: 'calc(100% - 60px)', // 24px + 24px + 12px
    alignItems: 'center'
  },

  headline: {
    fontSize: '16px',
    lineHeight: '19px',
    color: '#142A36',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  headlineActive: {
    color: palette.text.primary
  },

  subHeadline: {
    marginTop: 3,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#658698',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  subHeadlineActive: {
    textOverflow: 'unset',
    whiteSpace: 'unset',
    overflow: 'unset',
    overflowWrap: 'break-word'
  },

  logo: {
    marginRight: 12,
    minWidth: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF'
  },

  textContainer: {
    width: '100%'
  },

  listItemMoreButton: {}
}), { index: 1 });
