import { from, switchMap } from "rxjs";

import { request } from "@utils/request.ts";

export const graphQlQuery = (query: string, variables: object) => {
    return from(request(query, variables)).pipe(
        switchMap(response => from(response.json()))
    );
};