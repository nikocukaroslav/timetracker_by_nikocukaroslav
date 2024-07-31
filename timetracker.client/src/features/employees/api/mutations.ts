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

export const getUserQuery = `
query GetUser($id: Guid!) {
  users {
    getUser(id: $id) {
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

export const deleteUserMutation = `
mutation DeleteUser($userId: Guid!) {
  users {
    deleteUser(id: $userId)
  }
}
`

export const updateUserPermissionsMutation = `
mutation UpdateUserPermissions($permissions: [String!], $id: Guid!) {
  users {
    updateUserPermissions(permissions: $permissions, id: $id) {
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
