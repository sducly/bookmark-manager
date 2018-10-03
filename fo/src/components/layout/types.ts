import { WithStyles } from "@material-ui/core";
import { ApolloError } from "apollo-boost";
import { User } from "../../schema";


export interface IErrorProps {
    error: ApolloError
}

export interface ILayoutProps extends WithStyles<any> {
    user: User
}

export interface ILayoutState {
    open: boolean
}
