import {from, switchMap} from "rxjs";
import {BASE_URL} from "../constants.ts";

export const graphQlQuery = (query: string, variables: object) => {
    return from(fetch(BASE_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables
        }),
    })).pipe(
        switchMap(response => from(response.json()))
    );
};