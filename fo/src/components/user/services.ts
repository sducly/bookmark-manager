import { Client, User } from '../../schema';
import { AuthenticateUserQuery, GetUserByTokenQuery } from './queries';

const TOKEN_SESSION_NAME = "user_token";

/**
 * Get credentiels from FormEvent and try to connect him. If success save the token
 * @param e FormEvent
 */
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

/**
 * Get the current user by token
 */
export const GetUser = async () => {
    const token = GetToken();
    if (token) {
        const result: any = await Client.query({
            query: GetUserByTokenQuery,
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

/**
 * Store token in session_storage
 * @param user User
 */
export const SaveToken = (user: User) => {
    sessionStorage.setItem(TOKEN_SESSION_NAME, user.token);
}

/**
 * Retrieve token from session_storage
 */
export const GetToken = () => {
    return sessionStorage.getItem(TOKEN_SESSION_NAME);
}

/**
 * Remove token stored in session_storage
 */
export const RemoveToken = () => {
    sessionStorage.removeItem(TOKEN_SESSION_NAME);
}
