import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import * as React from "react";
import { IInputProps, IPasswordState } from '../';


export const SelectWidget = ({ name, options, label, value = "", onChange }: { name: string, options: any, label: string, value?: any, onChange: () => void }) => {
    const menuItems: Array<React.ReactElement<any>> = [];

    options.forEach((i: { label: string, value: any }) => {
        menuItems.push(<MenuItem value={i.value} key={"select_" + i.label + "_" + i.value}>{i.label}</MenuItem>);
    });

    return <FormControl style={{
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

export const InputWidget = ({ name, label, type = "text", required = true, onChange, error = false, defaultValue, helpText="" }: IInputProps) => {
    return <TextField
        defaultValue={defaultValue}
        error={error}
        onChange={onChange}
        required={required}
        type={type}
        helperText={helpText}
        id={name}
        name={name}
        label={label}
        fullWidth={true}
        style={{
            width: "100%"
        }}
    />;
}

export const HiddenWidget = ({ name, value }: { name: string, value: any }) => {
    return <input
        type="hidden"
        defaultValue={value}
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

            <Grid item={true} xs={12} sm={6}>
                <InputWidget
                    name="password"
                    label="Password"
                    type="password"
                    onChange={this._onChange} />
            </Grid>
            <Grid item={true} xs={12} sm={6}>
                <InputWidget
                    error={hasError}
                    name="confirmation"
                    label="Confirmation"
                    type="password"
                    onChange={this._onChange} />
            </Grid>
        </React.Fragment>
    }

    private _onChange(e: any) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

// tslint:disable-next-line:max-classes-per-file
class Tags extends React.Component<IInputProps, { values?: string | number }> {
    constructor(props: IInputProps) {
        super(props);
        this.state = {
            values: this.props.defaultValue
        }
        this.handleChange = this.handleChange.bind(this);
        this.getArrayValues = this.getArrayValues.bind(this);
    }

    public render() {
        return <React.Fragment>
            <ChipInput
                defaultValue={this.getArrayValues()}
                onChange={this.handleChange}
                fullWidth={true}
                placeholder={this.props.label}
                newChipKeyCodes={[9,13]}
            />
            <HiddenWidget name={this.props.name} value={this.state.values} key={this.state.values} />
        </React.Fragment>
    }

    private getArrayValues() {
        const { defaultValue } = this.props;

        if (!defaultValue) {
            return [];
        }

        return defaultValue.toString().split(',');
    }

    private handleChange(tags: string[]) {
        this.setState({
            values: tags.join()
        })
    }
}

export const TagsWidget = Tags;
export const PasswordWidget = Password;