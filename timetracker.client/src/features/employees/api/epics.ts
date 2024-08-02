import {Epic, ofType} from "redux-observable";
import {CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER_PERMISSIONS} from "../../../constants.ts";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {graphQlQuery} from "../../../utils/graphQlQuery.ts";
import {
    addUserMutation,
    deleteUserMutation,
    getUserQuery,
    getUsersQuery,
    updateUserPermissionsMutation
} from "./mutations.ts";
import {addUser, removeUser, setLoading, setUser, setUsers, updateUser} from "../employeesSlice.ts";
import store from "../../../store.ts";
import {setError} from "../../authentication/authenticationSlice.ts";
import {MyAction} from "../../../interfaces/actions.ts";


export const createUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        tap(() => store.dispatch(setLoading(true))),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(addUserMutation, {
                    user: action.payload
                }
            )
                .pipe(
                    map(response => {
                            if (!response.errors)
                                return addUser(response.data.users.addUser)
                            return response.errors.forEach((message: string) => console.log(message))
                        }
                    ),
                    catchError((error) =>
                        of(setError(error.message))
                    ),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    );

export const getUsersEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USERS),
        switchMap(() =>
            graphQlQuery(getUsersQuery, {})
                .pipe(
                    map(response => setUsers(response.data.users.getUsers))
                )
        )
    );

export const deleteUserEpic: Epic<MyAction> = (action$) =>
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

export const getUserEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(GET_USER),
        switchMap(action =>
            graphQlQuery(getUserQuery, {id: action.payload})
                .pipe(
                    map(response => setUser(response.data.users.getUser))
                )
        )
    )

export const updateUserPermissionsEpic: Epic<MyAction> = (action$) =>
    action$.pipe(
        ofType(UPDATE_USER_PERMISSIONS),
        tap(() => store.dispatch(setLoading(true))),
        tap(() => store.dispatch(setError(""))),
        switchMap(action =>
            graphQlQuery(updateUserPermissionsMutation,
                {
                    permissions: action.payload.permissions,
                    id: action.payload.id
                })
                .pipe(
                    map(response => updateUser(response.data.users.updateUserPermissions)),
                    tap(() => store.dispatch(setLoading(false))),
                )
        )
    )
