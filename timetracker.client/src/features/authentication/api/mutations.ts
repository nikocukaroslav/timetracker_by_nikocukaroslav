export const loginMutation = `
mutation login($email: String!, $password: String!) {
  auth {
    login(email: $email, password: $password) {
      user {
        id
        name
        permissions
      }
      accessToken {
        token
        expiresAt
      }
    }
  }
}
`

export const authorizeMutation = `
{
  auth {
    authorize {
      id
      name
      surname
      email
      permissions
    }
  }
}
`

export const logoutMutation = `
mutation {
  auth {
    logout
  }
}
`

export const refreshTokenMutation = `
mutation {
  auth {
    refreshToken {
      token
      expiresAt
    }
  }
}
`