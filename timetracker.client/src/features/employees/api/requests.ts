export const createUserMutation = `
mutation CreateUser($user: CreateUserRequestType) {
  users {
    createUser(user: $user) {
      id
      name
      surname
      email
      position
      status
      timeload
      permissions
      isEmployed
    }
  }
}
`

export const getUsersQuery = `
{
  users {
    users {
      id
      name
      surname
      email
      position
      status
      timeload
      permissions
      isEmployed
    }
  }
}
`

export const getUserQuery = `
query GetUser($id: Guid!) {
  users {
    user(id: $id) {
      id
      name
      surname
      email
      position
      status
      timeload
      permissions
      isEmployed
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
      isEmployed
    }
  }
}
`
