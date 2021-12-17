import React, { memo } from 'react';
import { Grid, List, Link, ListItem, Typography, ListItemIcon } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { useStyles } from './style';
import { EnvelopeIcon } from '../../assets/Icons';
import { PRIVACY_POLICY_PATH, REGULATION_PATH, TERMS_OF_USE_PATH } from '../../constants';

const EMAIL = 'hello@blocksettle.com';

export const Footer = memo(() => {
  const classes = useStyles();

  return (
    <Grid className={ classes.container }>
      <Grid className={ classes.wrapper }>
        <List className={ classes.list }>
          <ListItem>
            <ListItemIcon className={ classes.listItemIconContainer }>
              <EnvelopeIcon className={ classes.listItemIcon }/>
            </ListItemIcon>
            <Link className={ classes.listItemText } href={ `mailto:${ EMAIL }` } target="_blank">{ EMAIL }</Link>
          </ListItem>
        </List>
        <Grid className={ classes.links }>
          <RouterLink className={ clsx(classes.listItemText, classes.linkSpace) } to={ TERMS_OF_USE_PATH }>
            Terms Of Use
          </RouterLink>
          <RouterLink className={ clsx(classes.listItemText, classes.linkSpace) } to={ REGULATION_PATH }>
            Regulation
          </RouterLink>
          <RouterLink className={ classes.listItemText } to={ PRIVACY_POLICY_PATH }>
            Privacy Policy
          </RouterLink>
        </Grid>
        <Typography className={ classes.copyText }>&copy; 2021 blocksettle.com</Typography>
      </Grid>
    </Grid>
  );
});
