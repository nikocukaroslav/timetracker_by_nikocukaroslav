import { AuthenticationActions } from "./authenticationActions.ts";
import { EmployeesActions } from "./employeesActions.ts";
import { TimeTrackerActions } from "./timeTrackerActions.ts";
import { WorkDayActions } from "@features/calendar/types/actions.ts";
import { RolesActions } from "./rolesActions.ts";
import { ActionStateActions } from "./actionStateActions.ts";

export type MyAction =
    EmployeesActions
    | TimeTrackerActions
    | AuthenticationActions
    | WorkDayActions
    | RolesActions
    | ActionStateActions

