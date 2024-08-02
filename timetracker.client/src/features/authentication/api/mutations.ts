export const loginMutation = `
mutation Login($email: String!, $password: String!) {
  auth {
    login(email: $email, password: $password) {
      user {
        id
        name
        employmentType
        permissions
      }
      accessToken {
        token
        expiresAt
      }
      refreshToken {
        token
        expiresAt
      }
    }
  }
}
`

export const authorizeMutation = `
mutation Authorize($refreshToken: String!) {
  auth {
    authorize(refreshToken: $refreshToken) {
      user {
        id
        name
        employmentType
        permissions
      }
      accessToken {
        token
        expiresAt
      }
      refreshToken {
        token
        expiresAt
      }
    }
  }
}
`

export const logoutMutation = `
mutation Logout($refreshToken: String!) {
  auth {
    logout(refreshToken: $refreshToken)
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