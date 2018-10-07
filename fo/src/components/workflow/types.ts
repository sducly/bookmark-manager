import { User } from "../../schema";

export enum ComponentsPathEnumType {
    SIGNIN = "/",
    CREATE_ACCOUNT = "/create-account",
    UPDATE_ACCOUNT = "/update-account",
    HOME = "/",
    BOOKMARK_LIST = "/bookmark-list",
    BOOKMARK_FORM = "/bookmark-form/:id"
}

export interface IWorkflowState {
    user?: User | null
}