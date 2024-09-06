import { catchError, EMPTY, from, switchMap } from "rxjs";
import { createStandaloneToast } from "@chakra-ui/react";

import { request } from "@utils/request.ts";

export const graphQlQuery = (query: string, variables: object) => {
    const { toast } = createStandaloneToast();

    return from(request(query, variables)).pipe(
        switchMap(response => from(response.json())),
        catchError(() => {
            toast({
                title: 'Server error',
                description: 'Service temporarily unavailable',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });

            return EMPTY;
        })
    )
};