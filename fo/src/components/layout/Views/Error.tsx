import * as React from "react";
import { IErrorProps } from "../";

export default class Error extends React.Component<IErrorProps, {}> {
    public render() {
        const {error} = this.props;

        if(error.networkError) {
            setTimeout(this.refreshApp, 2000);
            return <div>
                <p>[Initialization]: BO is being deployed</p>
                <p>Please wait, the page will refresh automatically</p>


            </div>;
        }

        return <p>Error: {error.message}</p>
    }

    private refreshApp() {
        window.location.reload();
    }
}