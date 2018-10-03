import { ApolloQueryResult } from "apollo-boost";
import { DocumentNode } from "graphql";

export interface IFetchMoreProps {
    fetchMore?: (T: any) => Promise<ApolloQueryResult<any>>
}

export interface IQueryProps {
    query?: DocumentNode,
    variables?: any,
    children: (T:any) => {}
}

export interface IQueryResponse extends IFetchMoreProps {
    data?: any
}

export interface IFormState{
    data: {};
}

export interface IFormProps extends IQueryProps {
    postSubmit?: (T:any) => void,
    mutation?: DocumentNode,
    submit?: (T: React.FormEvent) => void,
    variables?: {
        id: number
    }
}

export interface IPaginateResponse extends IQueryResponse, IFetchMoreProps{
    data: {},
}

export interface IPaginateProps extends IQueryProps {
    variables: {
        limit: number,
        offset: number
    }
}

export interface IInputProps {
    error?: boolean,
    defaultValue?: string,
    onChange?: (T: any) => void
    type?: "text" | "password" | "hidden" | "email",
    name: string,
    label: string,
    required?: boolean,
    colSize: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export interface IPasswordState {
    password?: string,
    confirmation?: string
}