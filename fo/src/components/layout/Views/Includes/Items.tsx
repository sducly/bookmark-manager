import * as React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountCircle';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { ComponentsPathEnumType } from '../../../workflow/types';

export const mainListItems = (
  <div>
    <ApolloConsumer>
      {(client: ApolloClient<any>) => (
        <Link to={ComponentsPathEnumType.HOME} onClick={() => {client.resetStore()}}>
          <ListItem button={true}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItem>
        </Link>
      )}
    </ApolloConsumer>
    <ListItem button={true}>
      <ListItemIcon>
        <AccountIcon />
      </ListItemIcon>
      <ListItemText primary="Profil" />
    </ListItem>
  </div>
);