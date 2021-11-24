import React, { memo, useMemo } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';

import { Props, StatusModalType } from './typedef';
import { StatusError, StatusSuccess, StatusWaiting } from '../../assets/Icons';
import { useStyles } from './style';
import { Modal } from '../Modal';

export const SuccessAlertModal = memo<Props>(({
  text,
  type,
  handleButtonClick,
  onlyBody,
  ...modalProps
}) => {
  const classes = useStyles();
  const processing = type === StatusModalType.PROCESSING;

  const icon = useMemo(() => {
    switch (type) {
      case StatusModalType.ERROR:
        return <StatusError className={ classes.icon }/>;

      case StatusModalType.PROCESSING:
        return <StatusWaiting className={ classes.icon }/>;

      default:
        return <StatusSuccess className={ classes.icon }/>;
    }
  }, [type]);

  const body = (
    <Grid className={ classes.modalContent }>
      { icon }

      <Typography className={ classes.modalHeadline }>
        { type || StatusModalType.SUCCESS }
      </Typography>

      <Typography className={ classes.modalMessage }>
        { processing ? 'Please wait' : text }
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
            : 'OK'
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
