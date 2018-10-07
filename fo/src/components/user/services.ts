import { Client, User } from '../../schema';
import { AuthenticateUserQuery, GetUserByToken } from './queries';

const TOKEN_SESSION_NAME = "user_token";

export const AuthenticateUser = async (e: any) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target;
    const inputEmail: HTMLInputElement | null = form.querySelector('[name="email"]');
    const inputPassword: HTMLInputElement | null = form.querySelector('[name="password"]');

    if (inputPassword && inputEmail) {
        const result: any = await Client.query({
            query: AuthenticateUserQuery,
            variables: {
                email: inputEmail.value,
                password: inputPassword.value
            }
        });

        const authenticateUser = result.data.authenticateUser;

        if (authenticateUser) {
            SaveToken(authenticateUser);
            return authenticateUser;
        }

        return null;
    }
}

export const GetUser = async () => {
    const token = GetToken();
    if (token) {
        const result: any = await Client.query({
            query: GetUserByToken,
            variables: {
                token
            }
        });

        const { getUserByToken } = result.data;
        if (getUserByToken) {
            return getUserByToken;
        }
    }
    return null;
}

export const SaveToken = (user: User) => {
    sessionStorage.setItem(TOKEN_SESSION_NAME, user.token);
}

export const GetToken = () => {
    return sessionStorage.getItem(TOKEN_SESSION_NAME);
}

export const RemoveToken = () => {
    sessionStorage.removeItem(TOKEN_SESSION_NAME);
}
