export const getReportsQuery = `
  query UsersReport($pagination: PaginationRequestType!, $startDate: Long!, $endDate: Long!) {
  users {
    usersReport(usersReport: { pagination: $pagination, startDate: $startDate, endDate: $endDate }) {
      items {
        id
        name
        surname
        email
        totalTime
        timeload
        percent
        role {
          id
          name
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