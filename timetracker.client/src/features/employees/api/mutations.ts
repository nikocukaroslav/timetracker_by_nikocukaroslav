export const addUserMutation = `
mutation addUser($user: UserInputType) {
  users {
    addUser(user: $user) {
      id
      name
      surname
      email
      employeeType
      permissions
    }
  }
}
`

export const getUsersQuery = `
{
  users {
    getUsers {
      id
      name
      email
      surname
      employeeType
      permissions
    }
  }
}
`

export const deleteUserMutation = `
mutation DeleteUser($userId: Guid!) {
  users {
    deleteUser(id: $userId)
  }
}
`