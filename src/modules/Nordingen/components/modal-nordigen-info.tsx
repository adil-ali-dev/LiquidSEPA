import React, { memo, useMemo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { ModalInfoProps } from '../typedef';
import { NordigenLogoIcon } from '../../../assets/Icons';
import { useStyles } from '../style';
import { Autocomplete } from '../../../components/Autocomplete';
import { Bank } from '../../../graphql/Nordigen/typedef';

export const ModalNordigenInfo = memo<ModalInfoProps>(({
  error,
  headline,
  message,
  bank,
  options,
  bankSelected,
  final,
  completed,
  optionsLoading,
  handleChange
}) => {
  const classes = useStyles();

  const headlineText = useMemo(() => {
    if (error) return 'Something went wrong';
    if (completed) return 'Verification is completed';
    if (final) return 'Creating an account';

    return headline;
  }, [error, final, completed, headline]);

  const messageText = useMemo(() => {
    if (error) return 'Please try again';
    if (completed) return 'Your Liquid address has been whitelisted';
    if (final) return 'Please wait';

    return message;
  }, [error, final, completed, message]);

  const renderOption = (option: Bank) => (
    <Grid className={ classes.modalInfoOption }>
      <img className={ classes.modalInfoOptionIcon } src={ option.logo } alt={ option.name }/>
      <Typography className={ classes.modalInfoOptionLabel }>
        { option.name }
      </Typography>
    </Grid>
  );

  return (bankSelected || final || completed) ? (
    <Grid className={ clsx(classes.modalInfoContainer, error && classes.modalInfoContainerError) }>
      <NordigenLogoIcon className={ classes.modalInfoIcon }/>
      <Grid>
        <Typography className={ classes.modalInfoHeadline }>
          { headlineText }
        </Typography>
        <Typography className={ classes.modalInfoMessage }>
          { messageText }
        </Typography>
      </Grid>
    </Grid>
  ) : (
    null
    // <Autocomplete
    //   className={ classes.modalInfoBank }
    //   optionsLoading={ optionsLoading }
    //   options={ options }
    //   handleChange={ handleChange }
    //   value={ bank }
    //   renderOption={ renderOption }
    //   label="Select your bank"
    //   getOptionLabel={ option => option.name }
    // />
  );
});
