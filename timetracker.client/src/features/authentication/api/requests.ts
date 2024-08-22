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

export const createUserPasswordMutation = `
mutation CreatePassword($password: String!, $temporaryLinkId: Guid!) {
  users {
    createPassword(user: { password: $password, temporaryLinkId: $temporaryLinkId })
  }
}
`

export const temporaryLinkValidationQuery = `
query TemporaryLinkValidity($temporaryLinkId: Guid!) {
  authQuery {
    temporaryLinkValidity(id: $temporaryLinkId)
  }
}
`

export const resendCreatePasswordEmailMutation = `
mutation ResendCreatePasswordEmail($temporaryLinkId: Guid!) {
  users {
    resendCreatePasswordEmail(tokenId: $temporaryLinkId)
  }
}
`