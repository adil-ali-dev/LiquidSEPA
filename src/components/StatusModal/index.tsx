import React, { memo, useMemo } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';

import { StatusModalType } from '../../typedef';
import { Props } from './typedef';
import { StatusErrorIcon, StatusSuccessIcon, StatusWaitingIcon, StatusWarningIcon } from '../../assets/Icons';
import { useStyles } from './style';
import { Modal } from '../Modal';

export const StatusModal = memo<Props>(({
  text,
  processingText,
  type,
  btnText,
  onlyBody,
  handleButtonClick,
  ...modalProps
}) => {
  const classes = useStyles();
  const processing = type === StatusModalType.PROCESSING;

  const icon = useMemo(() => {
    switch (type) {
      case StatusModalType.ERROR:
        return <StatusErrorIcon className={ classes.icon }/>;

      case StatusModalType.PROCESSING:
        return <StatusWaitingIcon className={ classes.icon }/>;

      case StatusModalType.WARNING:
        return <StatusWarningIcon className={ classes.icon }/>;

      default:
        return <StatusSuccessIcon className={ classes.icon }/>;
    }
  }, [type]);

  const body = (
    <Grid className={ classes.modalContent }>
      { icon }

      <Typography className={ classes.modalHeadline }>
      { type || StatusModalType.SUCCESS }
    </Typography>

      <Typography className={ classes.modalMessage }>
        { processing ? processingText || 'Please wait' : text }
      </Typography>

      <Button
        className={ classes.button }
        type="submit"
        variant="contained"
        color="primary"
        disabled={ processing }
        onClick={ handleButtonClick }
      >
        {
          processing
            ? <CircularProgress className={ classes.buttonIndicator } color="inherit" size={ 21 }/>
            : btnText || 'OK'
        }
      </Button>
    </Grid>
  );

  return onlyBody ? body : (
    <Modal { ...modalProps }>
      <Grid className={ classes.modal }>
        { body }
      </Grid>
    </Modal>
  );
});
