import React, { ChangeEvent, ComponentType, FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { Address, Currency, BankAccount } from '../../typedef';
import { Props, Product } from './typedef';
import { addressesActions, addressesItemsSelector } from '../../store/Addresses';
import { rfqActions, rfqAnyActionLoadingSelector, rfqConfirmationSelector, rfqEstimatedFeeSelector, rfqEstimatedReceiveSelector, rfqConfirmationDetailsSelector, rfqPaymentDetailsSelector, rfqTxConfirmationsCountSelector } from '../../store/Rfq';
import { bankAccountsActions, bankAccountsItemsSelector } from '../../store/BankAccounts';
import { useClipBoard } from '../../hooks/ClipBoard';
import { useDebounce } from '../../hooks/Debounce';
import { useSessionContext } from '../../contexts/Session';
import { useBankAccountContext } from '../../contexts/BankAccount';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { ConverterService } from '../../services';
import { Payment } from './components/payment';
import { RequisitesFooter } from './components/requisites-footer';
import { RequisitesMain } from './components/requisites-main';
import { StatusModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';
import { RequisitesHeader } from './components/requisites-header';
import { Form } from './components/form';

const MAX_CONFS = 2;
const WIDGET_MARGIN_TOP = 72;
const MAX_DELIVER = 1000;
const MIN_DELIVER = 2;
const MAX_DELIVER_SEPARATED = ConverterService.separateWith(MAX_DELIVER, ',');

const amountRegExp = new RegExp(/^(|\d)(|,)(|\d{0,3})(|(\.(\d{0,2})))$/);

const initialDeliver: Product = {
  product: Currency.EUR,
  amount: 0,
  placeholder: '',
  error: null
};

const initialReceive: Product = {
  product: Currency.EURX,
  amount: 0,
  placeholder: ''
};

const getInputData = (value: number, fixed: number) => {
  const amount = Number((value).toFixed(fixed));
  const placeholder = amount ? ConverterService.separate(amount, ',') : '';

  return { amount, placeholder };
};

export const withDeliveringFormDomain = (Component: ComponentType<Props>) => () => {
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const deliverInputRef = useRef<HTMLInputElement>(null);

  const whitelistAddress = useWhitelistAddressContext();
  const bankAccount = useBankAccountContext();
  const { status: isLoggedIn, controls: authControls } = useSessionContext();

  const [deliver, setDeliver] = useState(initialDeliver);
  const [receive, setReceive] = useState(initialReceive);
  const [account, setAccount] = useState<null | BankAccount>(null);
  const [address, setAddress] = useState<null | Address>(null);
  const [error, setError] = useState<null | string>(null);

  const deliverAmountDebounced = useDebounce(deliver.amount);
  const { copyToClipBoard } = useClipBoard();

  const estimatedFee = useSelector(rfqEstimatedFeeSelector);
  const estimatedReceive = useSelector(rfqEstimatedReceiveSelector);
  const loading = useSelector(rfqAnyActionLoadingSelector);
  const rfqConfirmation = useSelector(rfqConfirmationSelector);
  // @ts-ignore
  const rfqConfirmationDetails = useSelector(state => rfqConfirmationDetailsSelector(state, deliver.amount, deliver.product));
  const rfqPaymentDetails = useSelector(rfqPaymentDetailsSelector);
  const rfqTxConfirmationsCount = useSelector(rfqTxConfirmationsCountSelector);
  const whitelistedAddresses = useSelector(addressesItemsSelector);
  const bankAccounts = useSelector(bankAccountsItemsSelector);

  const sellSide = useMemo(() => {
    return deliver.product === Currency.EURX;
  }, [deliver.product]);

  const disabledContinue = useMemo(() => {
    return loading || !!deliver.error || !deliver.amount || (sellSide
      ? !account
      : !address);
  }, [receive.product, account, address, loading, deliver.error, deliver.amount]);

  const confirmations = useMemo(() => {
    return rfqTxConfirmationsCount >= MAX_CONFS ? MAX_CONFS : rfqTxConfirmationsCount;
  }, [rfqTxConfirmationsCount]);

  useEffect(() => {
    if (!isLoggedIn) return;

    dispatch(rfqActions.getEstimation({ amount: deliverAmountDebounced }));
  }, [deliverAmountDebounced]);

  useEffect(() => {
    if (isLoggedIn) {
      deliverInputRef.current?.focus();
      dispatch(addressesActions.getAddresses());
      dispatch(bankAccountsActions.getBankAccounts());
      return;
    }

    setDeliver(initialDeliver);
    setReceive(initialReceive);
    setAccount(null);
    setAddress(null);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!whitelistedAddresses.length || address) return;

    setAddress(whitelistedAddresses[0]);
  }, [whitelistedAddresses.length]);

  useEffect(() => {
    if (!bankAccounts.length || account) return;

    setAccount(bankAccounts[0]);
  }, [bankAccounts.length])

  useEffect(() => {
    setReceive(prevReceive => ({ ...prevReceive, ...getInputData(estimatedReceive, sellSide ? 2 : 8) }));
  }, [estimatedReceive]);

  useEffect(() => {
    if (confirmations !== MAX_CONFS || !widgetRef.current || !isMobile) return

    window.scrollTo(0, widgetRef.current.offsetTop + WIDGET_MARGIN_TOP);
  }, [confirmations]);

  useEffect(() => {
    if (isMobile && widgetRef.current) {
      window.scrollTo(0, widgetRef.current.offsetTop + WIDGET_MARGIN_TOP);
    }

    if (!rfqConfirmation) {
      setError(null);
    }
  }, [!!rfqConfirmation]);

  const handleSwapClick = useCallback(() => {
    setDeliver({ ...deliver, product: receive.product });
    setReceive({ ...receive, product: deliver.product });
  }, [deliver, receive]);

  const handleDeliverChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    if (!amountRegExp.test(value)) return;

    const amount = ConverterService.convertToNumber(value);
    const placeholder = !amount
      ? ''
      : ConverterService.separateWith(
        (value.endsWith('.') || value.endsWith('.0') || value.endsWith('.00')) ? value : amount,
        ','
      );

    const maxError =
      amount > MAX_DELIVER && `Maximum amount to deliver is ${MAX_DELIVER_SEPARATED} ${deliver.product}`;
    const minError = amount < MIN_DELIVER && `Minimum amount to deliver is ${MIN_DELIVER} ${deliver.product}`;

    setDeliver({ ...deliver, amount, placeholder, error: minError || maxError || null });
  }, [deliver]);

  const handleContinueClick = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      authControls.openLogin();
      return;
    }

    if (disabledContinue) return;

    if (sellSide) {
      dispatch(rfqActions.sell({
        iban: account!.name,
        stableCurrency: deliver.product,
        amount: deliver.amount
      }));
    } else {
      dispatch(rfqActions.buy({
        label: address!.name,
        stableCurrency: receive.product,
        amount: deliver.amount
      }));
    }
  }, [disabledContinue, sellSide, address, account?.name, deliver.amount, isLoggedIn]);

  const handleBackClick = useCallback(() => {
    if (!rfqConfirmation) return;

    dispatch(rfqActions.resetData());
  }, [!!rfqConfirmation]);

  const handleCopyClick = useCallback(() => {
    copyToClipBoard(rfqConfirmation?.trackingCode);
  }, [rfqConfirmation?.trackingCode]);

  const handleTxCopyClick = useCallback(() => {
    copyToClipBoard(rfqPaymentDetails?.txId);
  }, [rfqPaymentDetails?.txId]);

  const handleIbanCopyClick = useCallback(() => {
    copyToClipBoard('EE84 7700 7710 0294 1438');
  }, []);

  const handleAddPress = () => {
    if (isLoggedIn) {
      if (sellSide) {
        bankAccount.controls.open();
      } else {
        whitelistAddress.controls.open();
      }
    } else {
      authControls.openLogin();
    }
  };

  const handleAddressSelect = useCallback((value: Address) => {
    setAddress(value);
  }, []);

  const handleAccountSelect = useCallback((value: BankAccount) => {
    setAccount(value);
  }, []);

  const handleErrorClose = useCallback(() => {
    setError(null);
  }, []);

  return (
    <>
      <Component next={!!rfqConfirmation} widgetRef={widgetRef}>
        {
          !!rfqConfirmation && (rfqPaymentDetails ? (
            <Payment
              paymentDetails={rfqPaymentDetails}
              confirmed={confirmations === MAX_CONFS}
              sellSide={sellSide}
              confs={confirmations}
              handleTxCopyClick={handleTxCopyClick}
            />
          ) : (
            <>
              <RequisitesHeader
                sellSide={sellSide}
                productName={deliver.product}
                amount={deliver.amount}
                handleBackClick={handleBackClick}
              />
              <RequisitesMain
                sellSide={sellSide}
                details={rfqConfirmationDetails}
                handleAddressCopyClick={handleCopyClick}
                handleIbanCopyClick={handleIbanCopyClick}
                handleRefCopyClick={handleCopyClick}
              />
              <RequisitesFooter
                sellSide={ sellSide }
                value={ sellSide ? account! : address! }
              />
            </>
          )) || (
            <Form
              deliverInputRef={ deliverInputRef }
              formRef={ formRef }
              sellSide={ sellSide }
              disabled={ disabledContinue }
              loading={ loading }
              account={ account }
              fee={ estimatedFee }
              address={ address }
              deliver={ deliver }
              isLoggedIn={ isLoggedIn }
              receive={ receive }
              textAreaRef={ textAreaRef }
              addresses={ whitelistedAddresses }
              accounts={ bankAccounts }
              handleSwapClick={ handleSwapClick }
              handleDeliverChange={ handleDeliverChange }
              handleContinueClick={ handleContinueClick }
              handleAddPress={ handleAddPress }
              handleAddressSelect={ handleAddressSelect }
              handleAccountSelect={ handleAccountSelect }
            />
          )
        }
      </Component>
      <StatusModal
        text={ error }
        type={ StatusModalType.ERROR }
        status={ !!error }
        btnText={ 'OK' }
        handleClose={ handleErrorClose }
        handleButtonClick={ handleErrorClose }
      />
    </>
  );
};
