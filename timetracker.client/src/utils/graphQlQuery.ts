import {from, switchMap} from "rxjs";
import {BASE_URL} from "../constants.ts";

export const graphQlQuery = (query: string, variables: object) => {
    return from(fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")} `,
        },
        body: JSON.stringify({
            query,
            variables
        }),
    })).pipe(
        switchMap(response => from(response.json()))
    );
};