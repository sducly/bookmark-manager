import * as React from "react";

import { IWorkflowState } from "../";
import Loading from "../../layout/Views/Loading";
import { GetUser } from "../../user";
import { PrivatesRoutes } from "./Includes/PrivateRoutes";
import { PublicRoutes } from "./Includes/PublicRoutes";

/**
 * Worfklow
 */
export default class Workflow extends React.Component<{}, IWorkflowState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            user: undefined
        }

        this.getUser = this.getUser.bind(this);
        this.getUser();
    }

    public render() {

        const { user } = this.state;

        {/* App is not initialized */}
        if (user === undefined) {
            return <Loading/>
        }

        {/* User is authenticated */}
        if (user) {
            return <PrivatesRoutes user={user} getUser={this.getUser}/>
        }

        {/* Anonymous user */}
        return <PublicRoutes/>
    }

    /**
     * Return the current user
     */
    private async getUser() {
        const user = await GetUser();

        this.setState({
            user
        });
    }


}