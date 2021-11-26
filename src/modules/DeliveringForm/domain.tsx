import React, { ChangeEvent, ComponentType, FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import { isMobile } from 'react-device-detect';

import { ProductType, BLOCKSTREAM_ASSET_ID, SIDESWAP_PREFIX, REFUND_ADDRESS } from '../../constants';
import { Address, Iban, Props, PaymentDetails, NameOnAccount, Product, ConfirmationDetails } from './typedef';
import { useEurDeliver, useEurXDeliver } from '../../graphql/Deliver/hooks';
import { useRfqStatus, useTxStatus } from '../../graphql/Transaction/hooks';
import { useConfirmation } from '../../graphql/Confirmation/hooks';
import { useFeeEstimation } from '../../graphql/Fee/hooks';
import { useDeliveringFormStatusContext } from '../../contexts/DeliveringForm';
import { useClipBoard } from '../../hooks/ClipBoard';
import { IbanService, BitcoinAddressService, ConverterService } from '../../services';
import { Form } from './components/form';
import { RequisitesHeader } from './components/requisites-header';
import { RequisitesMain } from './components/requisites-main';
import { RequisitesFooter } from './components/requisites-footer';
import { Payment } from './components/payment';
import { useSessionContext } from '../../contexts/Session';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useBankAccountContext } from '../../contexts/BankAccount';
import { WhitelistedAddress } from '../../graphql/WhitelistAddress/typedef';
import { BankAccount } from '../../graphql/BankAccount/typedef';

const MAX_CONFS = 2;
const WIDGET_MARGIN_TOP = 72;
const ADDRESS_TYPE = 'liquidnetwork';
const MAX_DELIVER = 1000;
const MIN_DELIVER = 2;
const MAX_DELIVER_SEPARATED = ConverterService.separateWith(MAX_DELIVER, ',');

const amountRegExp = new RegExp(/^(|\d)(|,)(|\d{0,3})(|(\.(\d{0,2})))$/);

const initialDeliver: Product = {
  product: ProductType.EUR,
  amount: 0,
  placeholder: '',
  error: null
};

const initialReceive: Product = {
  product: ProductType.EURX,
  amount: 0,
  placeholder: '0'
};

const initialIban: Iban = {
  value: '',
  error: null
};

const initialAddress: Address = {
  value: '',
  error: null
};

const getInputData = (value: number, fixed: number) => {
  const amount = Number((value).toFixed(fixed));
  const placeholder = amount ? ConverterService.separate(amount, ',') : '';

  return { amount, placeholder };
};

export const withDeliveringFormDomain = (Component: ComponentType<Props>) => () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [deliver, setDeliver] = useState(initialDeliver);
  const [receive, setReceive] = useState(initialReceive);

  const [iban, setIban] = useState(initialIban);
  const [address, setAddress] = useState(initialAddress);

  const [confirmationDetails, setConfirmationDetails] = useState<null | ConfirmationDetails>(null);

  const [payment, setPayment] = useState<null | PaymentDetails>(null);

  const { next, setNext } = useDeliveringFormStatusContext();
  const whitelistAddress = useWhitelistAddressContext();
  const bankAccount = useBankAccountContext();
  const { copyToClipBoard } = useClipBoard();
  const eurDeliver = useEurDeliver();
  const eurXDeliver = useEurXDeliver();
  const confirmation = useConfirmation();
  const feeEstimation = useFeeEstimation();
  const rfqStatus = useRfqStatus();
  const txStatus = useTxStatus();
  const { status: isLoggedIn, controls: authControls } = useSessionContext();

  const sellSide = useMemo(() => {
    return deliver.product === ProductType.EURX;
  }, [deliver.product]);

  const loading = useMemo(() => {
    return eurDeliver.loading || eurXDeliver.loading || confirmation.loading;
  }, [eurDeliver.loading, eurXDeliver.loading, confirmation.loading]);

  const disabledContinue = useMemo(() => {
    return loading || !!deliver.error || !deliver.amount || (sellSide
      ? !iban.details || !!iban.error
      : !address.details || !!address.error);
  }, [receive.product, iban, address, loading, deliver.error, deliver.amount]);

  const confirmations = useMemo(() => {
    const confs = txStatus.data?.confs || 0;

    return confs >= MAX_CONFS ? MAX_CONFS : confs;
  }, [txStatus.data?.confs]);

  useEffect(() => {
    if (isLoggedIn) return;

    setDeliver(initialDeliver);
    setReceive(initialReceive);
    setIban(initialIban);
    setAddress(initialAddress);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!whitelistAddress.addresses.length || address.value) return;
    const details = whitelistAddress.addresses[0];

    setAddress({ value: details.acct_num, error: '', details });
  }, [whitelistAddress.addresses.length])

  useEffect(() => {
    if (!bankAccount.accounts.length  || iban.value) return;
    const details = bankAccount.accounts[0];

    setIban({ value: IbanService.format(details.name), error: '', details });
  }, [bankAccount.accounts.length])

  useEffect(() => {
    setDeliver({ ...deliver, error: eurDeliver.data?.errorMessage || eurXDeliver.data?.errorMessage });
  }, [eurDeliver.data?.errorMessage, eurXDeliver.data?.errorMessage]);

  useEffect(() => {
    setReceive(prevReceive => ({
      ...prevReceive, ...getInputData(feeEstimation.data.receive, sellSide ? 2 : 8)
    }));
  }, [feeEstimation.data.receive]);

  useEffect(() => {
    (confirmation.loading) && setConfirmationDetails(null);
  }, [confirmation.loading]);

  useEffect(() => {
    if (eurDeliver.data?.rfqId || eurXDeliver.data?.rfqId) {
      confirmation.confirm(eurDeliver.data?.rfqId || eurXDeliver.data?.rfqId || '');
    }
  }, [eurDeliver.data?.rfqId, eurXDeliver.data?.rfqId]);

  useEffect(() => {
    if (confirmation.data) {
      const commonQuery = {
        amount: `${deliver.amount}`,
        label: deliver.product,
        message: deliver.product,
        assetid: BLOCKSTREAM_ASSET_ID
      };

      const qrQuery = new URLSearchParams(commonQuery);

      const appToAppQuery = new URLSearchParams({
        address: confirmation.data.trackingCode,
        addressType: ADDRESS_TYPE,
        ...commonQuery
      });

      setConfirmationDetails({
        ...confirmation.data,
        appToAppValue: `${SIDESWAP_PREFIX}/?${appToAppQuery}`,
        qrValue: `${ADDRESS_TYPE}:${confirmation.data.trackingCode}?${qrQuery}`
      });
    }
  }, [confirmation.data]);

  useEffect(() => {
    if (confirmation.data) {
      rfqStatus.fetch({ rfqId: confirmation.data.rfqId });
      setNext(true);
    }
  }, [confirmation.data]);

  useEffect(() => {
    const txId = rfqStatus.data?.tx_id;

    if (txId) {
      rfqStatus.stopPolling?.();
      txStatus.fetch({ txId });
    }
  }, [rfqStatus.data?.tx_id]);

  useEffect(() => {
    if (txStatus.data?.unblinded_link && rfqStatus.data?.tx_id) {
      const { data } = rfqStatus;

      setPayment({
        txId: data.tx_id!,
        link: txStatus.data.unblinded_link,
        received: {
          amount: Number(data.deposit_amount),
          iban: data.depositor_iban,
          nameOnAccount: data.depositor_name
        },
        sending: {
          amount: Number(data.payout_amount),
          iban: data.payout_iban,
          nameOnAccount: data.payout_account_owner
        }
      });
    }
  }, [txStatus.data?.unblinded_link]);

  useEffect(() => {
    if (confirmations === MAX_CONFS && widgetRef.current) {
      txStatus.stopPolling?.();
      isMobile && window.scrollTo(0, widgetRef.current.offsetTop + WIDGET_MARGIN_TOP);
    }
  }, [confirmations]);

  useEffect(() => {
    if (isMobile && widgetRef.current) {
      window.scrollTo(0, widgetRef.current.offsetTop + WIDGET_MARGIN_TOP);
    }

    if (!next) {
      setPayment(null);
      setConfirmationDetails(null);
      setPayment(null);
    }
  }, [next]);

  const handleSwapClick = useCallback(() => {
    setDeliver({ ...deliver, product: receive.product });
    setReceive({ ...receive, product: deliver.product });
  }, [deliver, receive]);

  const handleDeliverChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    if (!amountRegExp.test(value)) return;

    const amount = ConverterService.convertToNumber(value);

    feeEstimation.estimate(amount);

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

  const handleEnterTextAreaPress = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && formRef?.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      event.preventDefault();
    }
  }, []);

  const handleContinueClick = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      authControls.openLogin();
      return;
    }

    if (disabledContinue) return;

    if (sellSide) {
      eurDeliver.deliver({
        iban: iban.value.replaceAll(' ', ''),
        amount: deliver.amount
      });
    } else {
      eurXDeliver.deliver({
        label: address.details!.name,
        amount: deliver.amount
      });
    }
  }, [disabledContinue, sellSide, address, iban, deliver.amount, isLoggedIn]);

  const handleBackClick = useCallback(() => {
    setNext(false);
  }, []);

  const handleCopyClick = useCallback(() => {
    copyToClipBoard(confirmation.data?.trackingCode);
  }, [confirmation.data?.trackingCode]);

  const handleTxCopyClick = useCallback(() => {
    copyToClipBoard(payment?.txId);
  }, [payment?.txId]);

  const handleIbanCopyClick = useCallback(() => {
    copyToClipBoard('EE84 7700 7710 0294 1438');
  }, []);

  const handleRefCopyClick = useCallback(() => {
    copyToClipBoard(confirmation.data?.trackingCode);
  }, [confirmation.data?.trackingCode]);

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

  const handleAddressSelect = useCallback((details: WhitelistedAddress) => {
    setAddress({ value: details.acct_num.trim(), error: '', details });
  }, []);

  const handleAccountSelect = useCallback((details: BankAccount) => {
    setIban({ value: IbanService.format(details.name), error: '', details });
  }, []);

  return (
    <Component next={next} widgetRef={widgetRef}>
      {
        next && (payment ? (
          <Payment
            paymentDetails={payment}
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
              details={confirmationDetails}
              handleAddressCopyClick={handleCopyClick}
              handleIbanCopyClick={handleIbanCopyClick}
              handleRefCopyClick={handleRefCopyClick}
            />
            <RequisitesFooter
              sellSide={sellSide}
              value={sellSide ? iban.value : address.value}
            />
          </>
        )) || (
          <Form
            formRef={ formRef }
            sellSide={ sellSide }
            disabled={ disabledContinue }
            loading={ loading }
            iban={ iban }
            fee={ feeEstimation.data.fee }
            address={ address }
            deliver={ deliver }
            isLoggedIn={ isLoggedIn }
            receive={ receive }
            textAreaRef={ textAreaRef }
            addresses={ whitelistAddress.addresses }
            accounts={ bankAccount.accounts }
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
  );
};
