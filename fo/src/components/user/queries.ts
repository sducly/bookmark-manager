import gql from "graphql-tag";

export const UserQuery = gql`
query User($id: Int) {
  result: user(id: $id) {
    id firstName lastName email password
  }
}`;

export const GetUserByTokenQuery = gql`
query GetUserByToken($token: String) {
  getUserByToken(token: $token) {
    id firstName lastName email token
  }
}`;

export const AuthenticateUserQuery = gql`
query AuthenticateUser($email: String, $password: String) {
    authenticateUser(email: $email, password: $password) {
      id firstName lastName email token
  }
}`;

export const UpdateUserQuery = gql`
mutation UpdateUser($id: Int, $firstName: String, $lastName: String, $email: String, $password: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id firstName lastName email token
  }
}`;