import * as React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom';
import { ComponentsPathEnumType } from '../../workflow/types';

export const mainListItems = (
  <div>
    <Link to={ComponentsPathEnumType.HOME}>
      <ListItem button={true}>
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Bookmarks" />
      </ListItem>
    </Link>
    <ListItem button={true}>
      <ListItemIcon>
        <AccountIcon />
      </ListItemIcon>
      <ListItemText primary="Profil" />
    </ListItem>
  </div>
);