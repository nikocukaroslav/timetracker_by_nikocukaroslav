import {ofType} from "redux-observable";
import {CREATE_USER, DELETE_USER, GET_USERS} from "../../../constants.ts";
import {map, switchMap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {addUserMutation, deleteUserMutation, getUsersQuery} from "./mutations.ts";
import {addUser, removeUser, setUsers} from "../employeesSlice.ts";

export const createUserEpic = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        switchMap(action =>
            graphQlQuery(addUserMutation, {
                    user: action.payload
                }
            )
                .pipe(
                    map(response => addUser(response.data.users.addUser))
                )
        )
    );

export const getUsersEpic = (action$) =>
    action$.pipe(
        ofType(GET_USERS),
        switchMap(() =>
            graphQlQuery(getUsersQuery, {})
                .pipe(
                    map(response => setUsers(response.data.users.getUsers))
                )
        )
    )

export const deleteUserEpic = (action$) =>
    action$.pipe(
        ofType(DELETE_USER),
        switchMap(action =>
            graphQlQuery(deleteUserMutation, {
                    userId: action.payload
                }
            )
                .pipe(
                    map(() => removeUser(action.payload))
                )
        )
    );

