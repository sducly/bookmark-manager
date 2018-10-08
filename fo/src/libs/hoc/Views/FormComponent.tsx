
import * as React from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router";
import { IFormProps, IFormState, IQueryResponse, Query } from "../";
import { Client } from "../../../schema";

/**
 * Form component
 * Fetch entity with Query. Render mutation form
 */
export default class FormComponent extends React.Component<IFormProps, IFormState> {

    private update: ({ }) => void;

    constructor(props: IFormProps) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {
            data: {}
        }
    }

    public render() {

        if(this.state.redirectUrl) {
            return <Redirect to={this.state.redirectUrl}/>
        }

        if (!this.props.query) {
            return this.renderMutation({
                result: null
            })
        }

        return <Query query={this.props.query} variables={this.props.variables}>

            {({ data }: IQueryResponse): any => {
                return this.renderMutation(data.result);
            }}
        </Query>
    }

    /**
     * Render the mutation part (only form)
     * @param queryData IQueryResult
     */
    private renderMutation(queryData: any) {
        const { children }: any = this.props;

        if(this.props.mutation) {
        return <Mutation mutation={this.props.mutation}>
            {(update) => {
                this.update = update;
                if (children) {
                    return this.renderChildren(children, queryData);
                }
                return [];

            }}
        </Mutation>
        }

        return this.renderChildren(children, {});
    }

    /**
     * Render form and childre. Pass query data on parameters
     */
    private renderChildren(children: any, data: any) {
        return <form
            className="form-component"
            onSubmit={this.props.submit ? this.props.submit : this._onSubmit}>

            {children(data)}
        </form>
    }

    /**
     * Handle form submit
     */
    private async _onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.currentTarget;
        const inputErrors = form.querySelectorAll('[aria-invalid="true"]');

        if (inputErrors.length === 0) {
            
            const data = {};
            form.querySelectorAll('[name]').forEach((element:any) => {
                data[element.name] = element.value
            });

            const result: any = await this.update({ variables: data });

            if (this.props.postSubmit) {
                this.props.postSubmit(result.data);
            }

            if(this.props.redirectUrl) {
                await Client.resetStore();
                this.setState({
                    redirectUrl: this.props.redirectUrl
                })
            }
        }
    }
}