import { ApolloQueryResult } from "apollo-boost";
import { DocumentNode } from "graphql";

export interface IFetchMoreProps {
    fetchMore?: (T: any) => Promise<ApolloQueryResult<any>>
}

export interface IQueryProps {
    query?: DocumentNode,
    variables?: any,
    children: (T:any, F?: any) => {}
}

export interface IQueryResponse extends IFetchMoreProps {
    data?: any
}

export interface IFormState{
    data: {};
    redirectUrl?: string
}

export interface IFormProps extends IQueryProps {
    postSubmit?: (T:any) => void,
    mutation?: DocumentNode,
    submit?: (T: React.FormEvent) => void,
    redirectUrl?: string,
    variables?: {
        id: number
    }
}

export interface ITableResponse extends IQueryResponse, IFetchMoreProps{
    data: {},
}

export interface ITableProps extends IQueryProps {
    limit: number,
    toolbar?: any
}

export interface IDialogProps {
    title: string,
    content: string,
    onConfirm: (T?: {}) => Promise<boolean>,
    children?: (T:any) => void,
    confirmParams: {},
    redirectUrl?: string
}

export interface IDialogState {
    open: boolean,
    redirectUrl?: string
}
