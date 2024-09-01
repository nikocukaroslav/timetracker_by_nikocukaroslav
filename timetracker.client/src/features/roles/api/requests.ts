export const getRolesQuery = `
query GetRolesQuery {
  roles {
    roles {
      id
      name
      defaultPermissions
    }
  }
}
`