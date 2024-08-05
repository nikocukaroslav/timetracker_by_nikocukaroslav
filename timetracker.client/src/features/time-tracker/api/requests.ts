export const startSessionMutation = `
mutation startSession($session: StartSessionRequestType) {
  workSessions {
   startSession(session: $session) {
      id
    }
  }
}
`

export const stopSessionMutation = `
  mutation stopSession($session: StopSessionRequestType) {
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
  mutation editSession($session: EditSessionRequestType) {
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
  mutation addSession($session: AddSessionRequestType) {
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
  mutation deleteSession($id: Guid) {
  workSessions {
    deleteSession(id: $id)
  }
}
`