import React, { memo } from 'react';
import { Button, Grid, Typography, ButtonBase } from '@material-ui/core';
import QRCode from 'react-qr-code';
import clsx from 'clsx';

import { RequisitesMainProps } from '../typedef';
import { BitcoinAddressService } from '../../../services';
import { AttentionIcon, CopyIcon, LinkIcon } from '../../../assets/Icons';
import { useStyles } from '../style';
import { Row } from './row';

export const RequisitesMain = memo<RequisitesMainProps>(({
  sellSide,
  details,
  handleAddressCopyClick,
  handleIbanCopyClick,
  handleRefCopyClick
}) => {
  const classes = useStyles();

  return sellSide ? (
    <Grid className={ clsx(classes.details, classes.detailsAddress) }>
      <Grid className={ classes.detailsAddressContainer }>
        <Grid className={ classes.detailsQRContainer }>
          { details?.qrValue && <QRCode value={ details.qrValue } size={ 134 }/> }
        </Grid>
        <Grid className={ classes.detailsAddressInfo }>
          <Typography className={ classes.detailsAddressText }>
            { details?.trackingCode && BitcoinAddressService.crop(details?.trackingCode, 90) }
          </Typography>
          <Button className={ classes.detailsAddressCopyButton } onClick={ handleAddressCopyClick }>
            <Grid className={ classes.detailsAddressCopyIconContainer }>
              <CopyIcon className={ classes.detailsAddressCopyIcon }/>
            </Grid>
            Copy Address
          </Button>
          {
            details?.appToAppValue && (
              <Button
                className={ classes.detailsAddressPaymentLinkButton }
                href={ details.appToAppValue }
                target="_blank"
              >
                <Grid className={ classes.detailsAddressCopyIconContainer }>
                  <LinkIcon className={ classes.detailsAddressCopyIcon }/>
                </Grid>
                Payment Link
              </Button>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid className={ clsx(classes.details, classes.detailsBank) }>
      <Grid>
        <Row label="IBAN">
          <ButtonBase
            className={ clsx(classes.rowText, classes.detailsBankRowButton) }
            onClick={ handleIbanCopyClick }
          >
            EE84 7700 7710 0294 1438
            <CopyIcon className={ classes.detailsBankCopyIcon }/>
          </ButtonBase>
        </Row>
        <Row label="Payment reference">
          <ButtonBase
            className={ clsx(classes.rowText, classes.detailsBankRowButton) }
            onClick={ handleRefCopyClick }
          >
            { details?.trackingCode }
            <CopyIcon className={ classes.detailsBankCopyIcon }/>
          </ButtonBase>
        </Row>
        <Grid className={ classes.detailsBankWarningContainer }>
          <Grid className={ classes.detailsBankWarningHeader }>
            <Grid className={ classes.detailsBankWarningIconContainer }>
              <AttentionIcon className={ classes.detailsBankWarningIcon }/>
            </Grid>
            <Typography className={ classes.detailsBankWarningText }>
              Do not forget to include the above reference number.
            </Typography>
          </Grid>
        </Grid>
        <Row label="Account holder" value="BlockSettle AB" spaceMedium/>
        <Row label="Bank" value="LHV (LHVBEE22)" spaceSmall/>
        <Row label="Country" value="Estonia" spaceSmall/>
      </Grid>
    </Grid>
  );
});
