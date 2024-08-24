import { BASE_URL } from "@constants";
import store from "@store";

export const request = (query: string, variables: object) => {
    return fetch(BASE_URL, {
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
    });
};