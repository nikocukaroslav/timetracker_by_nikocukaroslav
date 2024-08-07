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

export const editSessionMutation = `
  mutation EditSession($session: EditSessionRequestType) {
    workSessions {
     editSession(session: $session) {
        id
        startTime
        endTime
        setBy
        editedAt
        userId
        editor {
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
  }
`

export const addSessionMutation = `
  mutation AddSession($session: AddSessionRequestType) {
    workSessions {
        addSession(session: $session) {
          id
          startTime
          endTime
          setBy
          editedAt
          userId
          editor{
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

export const getSessionsQuery = `
query GetWorkSessions($id: Guid) {
  users {
    getWorkSessions(id: $id) {
      id
      startTime
      endTime
      setBy
      editedAt
      userId
      editor {
        id
        name
        surname
        email
        position
      }
    }
  }
}
`

export const getLastWorkSessionQuery = `
query GetLastWorkSession($id: Guid) {
  users {
    getLastWorkSession(id: $id) {
      id
      startTime
    }
  }
}
`