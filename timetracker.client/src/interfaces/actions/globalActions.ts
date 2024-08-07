import { AuthenticationActions } from "./authenticationActions.ts";
import { EmployeesActions } from "./employeesActions.ts";
import { TimeTrackerActions } from "./timeTrackerActions.ts";

export type MyAction =
    EmployeesActions
    | TimeTrackerActions
    | AuthenticationActions

