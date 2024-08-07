export const addUserMutation = `
mutation AddUser($user: AddUserRequestType) {
  users {
    addUser(user: $user) {
      id
      name
      surname
      email
      position
      status
      timeload
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
      surname
      email
      position
      status
      timeload
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
      position
      status
      timeload
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

export const updateUserMutation = `
mutation UpdateUser($user: UpdateUserRequestType) {
  users {
    updateUser(user: $user) {
      id
      name
      surname
      email
      position
      status
      timeload
      permissions
    }
  }
}
`
