import React, { memo } from 'react';
import { Button, Dialog } from '@material-ui/core';

import { Props } from './typedef';
import { CloseIcon } from '../../assets/Icons';
import { useStyles } from './style';

export const Modal = memo<Props>(({ status, handleClose, children }) => {
  const styles = useStyles();

  return (
    <Dialog
      classes={{ scrollPaper: styles.scrollPaper, paper: styles.dialogPaper }}
      className={ styles.modal }
      open={ status }
      onClose={ handleClose }
    >
      <>
        {
          handleClose && (
            <Button className={ styles.modalCloseButton } onClick={ handleClose }>
              <CloseIcon className={ styles.modalCloseIcon }/>
            </Button>
          )
        }
        { children }
      </>
    </Dialog>
  );
});
