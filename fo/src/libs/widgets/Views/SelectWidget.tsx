import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import * as React from "react";

/**
 * Select widget
 */
export default ({ name, options, label, value = "", onChange }: { name: string, options: any, label: string, value?: any, onChange: () => void }) => {
    const menuItems: Array<React.ReactElement<any>> = [];

    options.forEach((i: { label: string, value: any }) => {
        menuItems.push(<MenuItem value={i.value} key={"select_" + i.label + "_" + i.value}>{i.label}</MenuItem>);
    });

    return <FormControl fullWidth={true}>
        <InputLabel htmlFor={name}>
            {label}
        </InputLabel>
        <Select name={name} displayEmpty={true} id={name} value={value} onChange={onChange}>
            {menuItems}
        </Select>
    </FormControl>
}