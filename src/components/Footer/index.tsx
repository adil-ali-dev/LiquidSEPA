import React, { memo } from 'react';
import { Grid, Link, List, ListItem, Typography, ListItemIcon } from '@material-ui/core';

import { useStyles } from './style';
import { EnvelopeIcon, LocationIcon } from '../../assets/Icons';

const EMAIL = 'hello@liquidsepa.com';

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
        <Typography className={ classes.copyText }>&copy; 2021 liquidsepa.com</Typography>
      </Grid>
    </Grid>
  );
});
