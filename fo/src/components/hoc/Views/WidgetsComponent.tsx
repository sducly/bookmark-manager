import TextField from '@material-ui/core/TextField';
import * as React from "react";

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { IInputProps, IPasswordState } from '../';

export const SelectWidget = ({ name, options, label, value = "", onChange }: { name: string, options: any, label: string, value?: any, onChange:()=> void }) => {
    const menuItems: Array<React.ReactElement<any>> = [];

    options.forEach((i: { label: string, value: any }) => {
        menuItems.push(<MenuItem value={i.value} key={"select_"+i.label+"_"+i.value}>{i.label}</MenuItem>);
    });

    return  <FormControl style={{
        width: "100%"
    }}>
        <InputLabel htmlFor={name}>
            {label}
        </InputLabel>
        <Select name={name} displayEmpty={true} id={name} value={value} onChange={onChange}>
            {menuItems}
        </Select>
    </FormControl>
}

export const InputWidget = ({ name, label, type = "text", required = true, onChange, error = false, defaultValue }: IInputProps) => {
    return <TextField
            defaultValue={defaultValue}
            error={error}
            onChange={onChange}
            required={required}
            type={type}
            id={name}
            name={name}
            label={label}
            fullWidth={true}
            style={{
                width: "100%"
            }}
        />;
}

export const HiddenWidget = ({name, value}: {name: string, value: string}) => {
    return <input
        type="hidden"
        value={value}
        name={name}
    />
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
                name="password"
                label="Password"
                type="password"
                onChange={this._onChange} />
            <InputWidget
                error={hasError}
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