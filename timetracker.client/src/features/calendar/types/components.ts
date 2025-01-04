import { UseDisclosureProps } from "@chakra-ui/react";
import { CreateEditFormProps } from "@interfaces/components.ts";

export interface CreateEditWorkDayFormProps extends CreateEditFormProps {
    disclosure?: UseDisclosureProps,
    onCreate?: ({ startTime, endTime }: {
        startTime: string;
        endTime: string;
        days: [];
    }) => void,
    onUpdate?: ({ startTime, endTime }: {
        startTime: string;
        endTime: string;
    }) => void,
    formData?: {
        startTime: string;
        endTime: string;
    },
}

export interface CalendarSearchListProps {
    userId: string,
    users: Array<{ id: string, name: string, surname: string, email: string }>;
    handleSelectUser: (id: string) => void;
}