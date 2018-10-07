import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ComponentsPathEnum } from "../..";
import { User } from "../../../../schema";
import { BookmarkForm, BookmarkTable } from "../../../bookmark";
import Layout from "../../../layout/Views/Layout";
import NotFound from "../NotFound";

export const PrivatesRoutes = ({user}: {user: User}) => {
    return <Router>
    <Layout user={user}>
        <Switch>
            <Route exact={true} path={ComponentsPathEnum.HOME} render={(props) => <BookmarkTable {...props} user={user}/>} />
            <Route exact={true} path={ComponentsPathEnum.BOOKMARK_FORM} render={(props) => <BookmarkForm {...props} user={user}/>} />
            <Route component={NotFound} />
        </Switch>
    </Layout>
</Router>
}