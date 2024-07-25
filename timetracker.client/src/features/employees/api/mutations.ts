export const addUserMutation = `
mutation AddUser($user: UserInputType!) {
  addUser(user: $user) {
    id
    name
    surname
    email
    password
    employeeType
    permissions
  }
}
`