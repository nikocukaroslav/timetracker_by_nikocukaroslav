export const getWorkDaysQuery = `
query GetWorkDays($workDays: GetWorkDaysRequestType) {
  users {
    workDays(workDays: $workDays) {
      id
      day
      startTime
      endTime
    }
  }
}
`;

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
      userId
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