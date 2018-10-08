import { Grid } from "@material-ui/core";
import * as React from "react";
import { InputWidget } from "../index";
import { IPasswordProps, IPasswordState } from "../types";

/**
 * Password widget 
 * Display an input password with confirmation
 */
export default class Password extends React.Component<IPasswordProps, IPasswordState> {

    constructor(props: IPasswordProps) {
        super(props);
        this.state = {
            confirmation: undefined,
            password: undefined
        }

        this._onChange = this._onChange.bind(this);
    }

    public render() {
        const { confirmation, password } = this.state;
        const hasError = (password && confirmation && (password !== confirmation)) ? true : false;
        return <React.Fragment>

            <Grid item={true} xs={12} sm={6}>
                <InputWidget
                    name="password"
                    label="Password"
                    type="password"
                    defaultValue={this.props.defaultValue}
                    required={this.props.required}
                    onChange={this._onChange} />
            </Grid>

            <Grid item={true} xs={12} sm={6}>
                <InputWidget
                    error={hasError}
                    name="confirmation"
                    label="Confirmation"
                    type="password"
                    defaultValue={this.props.defaultValue}
                    required={this.props.required}
                    onChange={this._onChange} />
            </Grid>

        </React.Fragment>
    }

    /**
     * Handle inputs change
     * @param e FormEvent
     */
    private _onChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}
