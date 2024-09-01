export const createUserMutation = `
mutation CreateUser($user: CreateUserRequestType) {
  users {
    createUser(user: $user) {
      id
      name
      surname
      email
      status
      timeload
      permissions
      isEmployed
      role {
        id
        name
      }
    }
  }
}
`

export const getUsersQuery = `
query GetUsers($pagination: PaginationRequestType, $filter: FilterUsersRequestType) {
  users {
    users(pagination: $pagination, filter: $filter) {
      items {
        id
        name
        surname
        email
        role {
          id
          name
        }
        status
        timeload
        permissions
        isEmployed
      }
      totalCount
      pageSize
      page
      hasNextPage
      hasPreviousPage
      totalPages
    }
  }
}
`

export const findUserQuery = `
query FindUser($input: String!) {
  users {
    find(input: $$input) {
      id
      name
      surname
      email
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
      role {
        id
        name
      }
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
      role {
        id
        name
      }
      status
      timeload
      permissions
      isEmployed
    }
  }
}
`