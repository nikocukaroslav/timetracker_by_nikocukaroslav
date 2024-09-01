import { AuthenticationActions } from "./authenticationActions.ts";
import { EmployeesActions } from "./employeesActions.ts";
import { TimeTrackerActions } from "./timeTrackerActions.ts";
import { WorkDayActions } from "@features/calendar/types/actions.ts";
import { RolesActions } from "@interfaces/actions/rolesActions.ts";

export type MyAction =
    EmployeesActions
    | TimeTrackerActions
    | AuthenticationActions
    | WorkDayActions
    | RolesActions

