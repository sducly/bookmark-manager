
export interface IInputProps {
    helpText?: string,
    error?: boolean,
    defaultValue?: string | number,
    onChange?: (T: any) => void
    type?: "text" | "password" | "hidden" | "email",
    name: string,
    label: string,
    required?: boolean
}

export interface IPasswordState {
    password?: string,
    confirmation?: string
}