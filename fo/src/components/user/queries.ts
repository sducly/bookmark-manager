import gql from "graphql-tag";

export const GetUserByToken = gql`
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

export const AddUser = gql`
mutation AddUser($firstName: String, $lastName: String, $email: String, $password: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id firstName lastName email token
  }
}`;