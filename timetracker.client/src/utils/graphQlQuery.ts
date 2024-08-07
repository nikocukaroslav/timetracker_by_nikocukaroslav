import { from, switchMap } from "rxjs";

import store from "@store";
import { BASE_URL } from "@constants";

export const graphQlQuery = (query: string, variables: object) => {
    return from(fetch(BASE_URL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.getState().authentication.accessToken}`,
        },
        body: JSON.stringify({
            query,
            variables
        }),
    })).pipe(
        switchMap(response => from(response.json()))
    );
};