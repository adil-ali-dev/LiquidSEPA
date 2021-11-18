import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import { Modal } from '../../../components/Modal';
import { AddPaymentMeanProps } from '../typedef';

export const AddPaymentMean: FC<AddPaymentMeanProps> = ({ show, handleClose }) => {

  return (
    <Modal status={ show } handleClose={ handleClose }>
      <Grid/>
    </Modal>
  );
};
