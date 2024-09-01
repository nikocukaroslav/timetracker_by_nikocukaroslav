export const startSessionMutation = `
mutation StartSession($session: StartSessionRequestType) {
  workSessions {
   startSession(session: $session) {
      id
    }
  }
}
`

export const stopSessionMutation = `
  mutation StopSession($session: StopSessionRequestType) {
    workSessions {
     stopSession(session: $session) {
        id
        startTime  
        endTime
        setBy
      }
    }
  }
`

export const updateSessionMutation = `
  mutation UpdateSession($session: UpdateSessionRequestType) {
    workSessions {
     updateSession(session: $session) {
        id
        startTime
        endTime
        setBy
        editedAt
        editor {
          id
          name
          surname
        }
      }
    }
  }
`

export const createSessionMutation = `
  mutation createSession($session: CreateSessionRequestType) {
    workSessions {
      createSession(session: $session) {
        id
        startTime
        endTime
        setBy
      } 
    }
  }
`

export const deleteSessionMutation = `
 mutation DeleteSession($id: Guid) {
  workSessions {
    deleteSession(id: $id)
  }
}
`

export const getWorkSessionsQuery = `
query GetWorkSessions($id: Guid, $pagination: PaginationRequestType) {
  users {
    workSessions(id: $id, pagination: $pagination) {
      items {
        id
        startTime
        endTime
        setBy
        editedAt
        editor {
          id
          name
          surname
          email
          role {
            id
            name
          }
        }
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

export const getLastWorkSessionQuery = `
query GetLastWorkSession($id: Guid) {
  users {
    lastWorkSession(id: $id) {
      id
      startTime
    }
  }
}
`