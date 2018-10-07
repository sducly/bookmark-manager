import * as React from "react";

import { IWorkflowState } from "../";
import Loading from "../../layout/Views/Loading";
import { GetUser } from "../../user";
import { PrivatesRoutes } from "./Includes/PrivateRoutes";
import { PublicRoutes } from "./Includes/PublicRoutes";

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
            return <Loading/>
        }

        if (user) {
            return <PrivatesRoutes user={user}/>
        }

        return <PublicRoutes/>
    }

    private async getUser() {
        const user = await GetUser();

        this.setState({
            user
        });
    }


}