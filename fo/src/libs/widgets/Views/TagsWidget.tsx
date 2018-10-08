import ChipInput from 'material-ui-chip-input';
import * as React from "react";
import { HiddenWidget } from "../";
import { IInputProps } from "../types";

/**
 * Tags widget
 */
export default class Tags extends React.Component<IInputProps, { values?: string | number }> {

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

    /**
     * Return a array of string
     */
    private getArrayValues() {
        const { defaultValue } = this.props;

        if (!defaultValue) {
            return [];
        }

        return defaultValue.toString().split(',');
    }

    /**
     * Handle Change on tags list (remove, add, ...)
     * @param tags String[]
     */
    private handleChange(tags: string[]) {
        this.setState({
            values: tags.join()
        })
    }
}