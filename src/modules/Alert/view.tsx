import React from 'react';

import { withAlertDomain } from './domain';
import { StatusModal } from '../../components/StatusModal';


export const AlertModule = withAlertDomain(props => {
  return (
    <StatusModal { ...props } />
  );
});
