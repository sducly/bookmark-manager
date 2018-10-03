
import * as React from "react";
import { Mutation } from "react-apollo";
import { IFormProps, IFormState, IQueryResponse, Query } from "../";


export default class FormComponent extends React.Component<IFormProps, IFormState> {

    private update: ({ }) => void;
    private data: {} = {};

    constructor(props: IFormProps) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    public render() {

        if (!this.props.query) {
            return this.renderMutation(this.data)
        }

        return <Query query={this.props.query} variables={this.props.variables}>

            {({ data }: IQueryResponse): any => {

                // TODO : Fix hardcoded props
                const firstProperty = Object.entries(data)[0];
                this.data = data[firstProperty[0]];

                return this.renderMutation(data);
            }}
        </Query>
    }

    private renderMutation(queryData: any) {
        const { children }: any = this.props;

        if(this.props.mutation) {
        return <Mutation mutation={this.props.mutation}>
            {(update, { data }) => {
                this.update = update;
                if (children) {
                    return this.renderChildren(children, data);
                }
                return [];

            }}
        </Mutation>
        }

        return this.renderChildren(children, {});
    }
    private renderChildren(children: any, data: any) {
        return <form
            className="form-component"
            onSubmit={this.props.submit ? this.props.submit : this._onSubmit}
            onChange={this._onChange}>

            {children(data)}
        </form>
    }

    private _onChange(e: React.SyntheticEvent) {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        const data = this.data;

        if (!data.hasOwnProperty(input.name)) {
            data[input.name] = null;
        }

        data[input.name] = input.value;
        this.data = data;
    }

    private async _onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.currentTarget;
        const inputErrors = form.querySelectorAll('[aria-invalid="true"]');

        if (inputErrors.length === 0) {
            const result: any = await this.update({ variables: this.data });
            if (this.props.postSubmit) {
                this.props.postSubmit(result.data);
            }
        }
    }
}