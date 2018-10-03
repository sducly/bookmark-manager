import { User } from "../../schema";

export interface ICreateAccountFormProps {
    classes: any
}

export interface ICreateAccountProps extends ICreateAccountFormProps {
    redirect: (T: User) => void
}

