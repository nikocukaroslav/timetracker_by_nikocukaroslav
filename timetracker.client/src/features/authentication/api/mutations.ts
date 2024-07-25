export const loginMutation = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password){
    id
    name
    surname
    employeeType
    permissions
  }
}
`