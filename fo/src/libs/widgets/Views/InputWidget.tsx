import { TextField } from "@material-ui/core";
import * as React from "react";
import { IInputProps } from "../types";

/**
 * Input widget
 */
export default ({ name, label, type = "text", required = true, onChange, error = false, defaultValue, helpText="" }: IInputProps) => {
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
        }}/>;
}