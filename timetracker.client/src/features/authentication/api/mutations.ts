export const loginMutation = `
query login($email: String!, $password: String!) {
  auth {
    login(email: $email, password: $password) {
      user {
        id
        name
        permissions
      }
      token
    }
  }
}
`