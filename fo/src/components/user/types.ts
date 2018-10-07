import { User } from "../../schema";

export interface ICreateAccountFormProps {
    classes: any,
    user?: User 
}

export interface ICreateAccountProps extends ICreateAccountFormProps {
    redirect: (T: User) => void
}

export interface IUpdateAccountProps extends ICreateAccountFormProps {
    user: User,
    getUser: () => void
}

