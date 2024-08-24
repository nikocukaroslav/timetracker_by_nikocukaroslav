export const getWorkDaysQuery = `
query GetWorkDays($workDays: GetWorkDaysRequestType) {
  users {
    workDays(workDays: $workDays) {
      workDays {
        id
        day
        startTime
        endTime
      } 
      user {
        id
        name
        surname
      } 
    }
  }
}
`;

export const findEmployeesQuery = `
query FindEmployees($input: String!) {
  users {
    find(input: $input) {
      id
      name
      surname
      email
    }
  }
}`

export const createWorkDaysMutation = `
mutation CreateWorkDays($workDays: CreateWorkDaysRequestType) {
  workDays {
    createWorkDays(workDays: $workDays) {
      id
      day
      startTime
      endTime
    }
  }
}
`;

export const updateWorkDayMutation = `
mutation UpdateWorkDay($workDay: UpdateWorkDayRequestType) {
  workDays {
    updateWorkDay(workDay: $workDay) {
      id
      day
      startTime
      endTime
    }
  }
}
`;

export const deleteWorkDayMutation = `
mutation DeleteWorkDay($id: Guid) {
  workDays {
    deleteWorkDay(id: $id)
  }
}
`;