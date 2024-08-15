export const getWorkDaysQuery = `
query GetWorkDays($id: Guid) {
  workDays {
    getWorkDays(id: $id) {
      id
      day
      startTime
      endTime
      userId
    }
  }
}
`;

export const createWorkDaysMutation = `
mutation CreateWorkDays($workDays: AddWorkDaysRequestType) {
  workDays {
    addWorkDays(workDays: $workDays) {
      id
      day
      startTime
      endTime
    }
  }
}
`;

export const updateWorkDayMutation = `
mutation UpdateWorkDay($workDay: EditWorkDayRequestType) {
  workDays {
    editWorkDay(workDay: $workDay) {
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