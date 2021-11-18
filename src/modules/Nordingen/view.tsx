import React from 'react';

import { withNordigenDomain } from './domain';
import { Modal } from '../../components/Modal';

export const NordigenModule = withNordigenDomain(({ modalStatus, handleModalCloseClick, children }) => (
  <Modal
    status={ modalStatus }
    handleClose={ handleModalCloseClick }
  >
    { children }
  </Modal>
));
