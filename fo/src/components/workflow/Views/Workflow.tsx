import * as React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ComponentsPathEnum, IWorkflowState } from "../";
import { BookmarkForm, BookmarkTable } from "../../bookmark";
import { Layout } from "../../layout";
import { Signin } from "../../signin";
import { CreateAccount, GetUser } from "../../user";
import NotFound from "./NotFound";

export default class Workflow extends React.Component<{}, IWorkflowState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            user: undefined
        }

        this.getUser();
    }

    public render() {

        const { user } = this.state;
        if (user === undefined) {
            return <React.Fragment />
        }

        if (user) {
            // private components
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

        // public composant
        return <Router>
            <Switch>
                <Route exact={true} path={ComponentsPathEnum.SIGNIN} component={Signin} />
                <Route exact={true} path={ComponentsPathEnum.CREATE_ACCOUNT} component={CreateAccount} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    }

    private async getUser() {
        const user = await GetUser();

        this.setState({
            user
        });
    }


}