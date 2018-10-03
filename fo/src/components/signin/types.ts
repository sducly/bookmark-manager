export interface ISiginFormProps {
    classes: any
}

export interface ISigninProps extends ISiginFormProps {
    history: {
        push: (T:string) => void
    }
}

