
import * as React from "react";
import { Mutation } from "react-apollo";
import { IFormProps, IFormState, IQueryResponse, Query } from "../";


export default class FormComponent extends React.Component<IFormProps, IFormState> {

    private update: ({ }) => void;

    constructor(props: IFormProps) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
    }

    public render() {

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
    private renderChildren(children: any, data: any) {
        return <form
            className="form-component"
            onSubmit={this.props.submit ? this.props.submit : this._onSubmit}>

            {children(data)}
        </form>
    }

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
        }
    }
}