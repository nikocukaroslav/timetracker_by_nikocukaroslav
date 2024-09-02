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

export const deleteRoleMutation = `
mutation DeleteRole($id: Guid!) {
  roles {
    deleteRole(id: $id)
  }
}
`

export const createRoleMutation = `
mutation CreateRole($role: CreateRoleRequestType!) {
  roles {
    createRole(role: $role) {
      id
      name
      defaultPermissions
    }
  }
}

`