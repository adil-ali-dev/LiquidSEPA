import React, { memo } from 'react';

import { ModalFormProps } from '../typedef';
import { ModalNordigenHeader } from './modal-nordigen-header';
import { ModalNordigenFooter } from './modal-nordigen-footer';
import { useStyles } from '../style';
import { BitcoinAddressService } from '../../../services';

export const ModalNordigenForm1 = memo<ModalFormProps>(({
  address,
  step,
  iban,
  disabled,
  loading,
  error,
  final,
  completed,
  bankSelected,
  children,
  handleSubmit
}) => {
  const classes = useStyles();

  return (
    <form className={ classes.modal } onSubmit={ handleSubmit }>
      <ModalNordigenHeader
        step={ step }
        iban={ iban }
        completed={ completed }
        error={ error }
      />
      { children }
      <ModalNordigenFooter
        address={ BitcoinAddressService.crop(address, 100) }
        loading={ loading }
        error={ error }
        bankSelected={ bankSelected }
        disabled={ disabled }
        final={ final }
        completed={ completed }
        step={ step }
      />
    </form>
  );
});
