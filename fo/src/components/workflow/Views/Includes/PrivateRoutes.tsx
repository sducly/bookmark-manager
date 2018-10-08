import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ComponentsPathEnum } from "../..";
import { User } from "../../../../schema";
import { BookmarkForm, BookmarkTable } from "../../../bookmark";
import Layout from "../../../layout/Views/Layout";
import { UpdateAccount } from "../../../user";
import NotFound from "../NotFound";

/**
 * Privates routes. Only for authenticated user
 */
export const PrivatesRoutes = ({user, getUser}: {user: User, getUser: () => void}) => {
    return <Router>
    <Layout user={user}>
        <Switch>
            <Route exact={true} path={ComponentsPathEnum.HOME} render={(props) => <BookmarkTable {...props} user={user}/>} />
            <Route exact={true} path={ComponentsPathEnum.BOOKMARK_FORM} render={(props) => <BookmarkForm {...props} user={user}/>} />
            <Route exact={true} path={ComponentsPathEnum.UPDATE_ACCOUNT} render={(props) => <UpdateAccount {...props} user={user} getUser={getUser}/>} />
            <Route component={NotFound} />
        </Switch>
    </Layout>
</Router>
}