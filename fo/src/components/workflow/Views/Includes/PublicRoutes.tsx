import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ComponentsPathEnum } from "../..";
import { Signin } from "../../../signin";
import { CreateAccount } from "../../../user";
import NotFound from "../NotFound";

/**
 * Public routes. For all anonymous users
 */
export const PublicRoutes = () => {
    return <Router>
        <Switch>
            <Route exact={true} path={ComponentsPathEnum.SIGNIN} component={Signin} />
            <Route exact={true} path={ComponentsPathEnum.CREATE_ACCOUNT} component={CreateAccount} />
            <Route component={NotFound} />
        </Switch>
    </Router>
}