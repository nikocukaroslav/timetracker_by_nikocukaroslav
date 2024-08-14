export const loginMutation = `
mutation Login($email: String!, $password: String!) {
  auth {
    login(email: $email, password: $password) {
      user {
        id
        name
        position
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
        position
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

export const logoutMutation = `
mutation Logout($refreshToken: String!) {
  auth {
    logout(refreshToken: $refreshToken)
  }
}
`

export const refreshTokenMutation = `
mutation RefreshToken($refreshToken: String!) {
  auth {
    refreshToken(refreshToken: $refreshToken) {
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