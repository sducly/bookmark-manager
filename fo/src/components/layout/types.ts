import { WithStyles } from "@material-ui/core";
import { ApolloError } from "apollo-boost";
import { User } from "../../schema";


export interface IErrorProps {
    error: ApolloError
}

export interface ILayoutProps extends WithStyles<any> {
    user: User
}

export interface IDrawerProps extends WithStyles<any> {
    isOpen: boolean,
    handleDrawerClose: () => void
}

export interface IHeaderProps extends WithStyles<any> {
    handleDrawerOpen: () => void,
    isOpen: boolean,
    user: User,
    logOut: () => void
}

export interface ILayoutState {
    open: boolean
}
