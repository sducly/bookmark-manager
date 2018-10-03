import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as React from "react";

import { IInputProps, IPasswordState } from '../';

export const InputWidget = ({ colSize, name, label, type = "text", required = true, onChange, error = false, defaultValue }: IInputProps) => {
    return <Grid item={true} xs={12} sm={colSize}>
        <TextField
            defaultValue={defaultValue}
            error={error}
            onChange={onChange}
            required={required}
            type={type}
            id={name}
            name={name}
            label={label}
            fullWidth={true}
        />
    </Grid>;
}

class Password extends React.Component<{}, IPasswordState> {

    constructor(props: {}) {
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
            <InputWidget
                colSize={6}
                name="password"
                label="Password"
                type="password"
                onChange={this._onChange} />
            <InputWidget
                error={hasError}
                colSize={6}
                name="confirmation"
                label="Confirmation"
                type="password"
                onChange={this._onChange} />
        </React.Fragment>
    }

    private _onChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export const PasswordWidget = Password;