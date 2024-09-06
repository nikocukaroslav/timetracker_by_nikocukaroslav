import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";
import { useDisclosure, useToast } from "@chakra-ui/react";

import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomInput from "@components/ui/CustomInput.tsx";

import { createWorkSession, updateWorkSession } from "@features/time-tracker/api/actions.ts";
import { CreateEditWorkSessionFormProps } from "@interfaces/components.ts";
import { schemas } from "@utils/inputHelpers.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useActionState } from "@hooks/useActionState.ts";
import { ERROR_DURATION } from "@constants";

const defaultFormData = {
    startTime: "",
    endTime: "",
}

function CreateEditWorkSessionForm({ formData, isEditing, children }: CreateEditWorkSessionFormProps) {
    const userId = useAppSelector((state) => state.authentication.user?.id) as string;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();

    const { loading: createWorkSessionLoading, error: createWorkSessionError } = useActionState(createWorkSession);
    const { loading: updateWorkSessionLoading, error: updateWorkSessionError } = useActionState(updateWorkSession);

    const error = createWorkSessionError || updateWorkSessionError;
    const loading = createWorkSessionLoading || updateWorkSessionLoading;

    const initialValues = {
        startTime: formData?.startTime,
        endTime: formData?.endTime,
    }

    async function handleAddUpdate(values) {
        const startTimeTimestamp = new Date(values.startTime).getTime();
        const endTimeTimestamp = new Date(values.endTime).getTime();
        setIsSubmitting(true);
        if (!isEditing) {
            const newSession = {
                startTime: startTimeTimestamp,
                endTime: endTimeTimestamp,
                userId
            };
            dispatch(createWorkSession(newSession));
        } else {
            const newSessionData = {
                id: formData?.id as string,
                startTime: startTimeTimestamp,
                endTime: endTimeTimestamp,
                editedAt: new Date().getTime(),
                editorId: userId,
            };
            dispatch(updateWorkSession(newSessionData));
        }
    }

    useEffect(() => {
        if (!isSubmitting || loading || !isOpen)
            return
        setIsSubmitting(false)
        if (error) {
            toast({
                title: "An error occurred",
                description: error.message,
                status: "error",
                duration: ERROR_DURATION,
                isClosable: true,
            });
            return;
        }
        if (!error)
            onClose()
    }, [error, isOpen, isSubmitting, loading, onClose]);

    return (
        <ModalForm
            title={isEditing ? "Edit work session" : "New work session"}
            titleIcon={<PiTimer size="24px"/>}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleAddUpdate}
            submitBtnLoading={loading}
            submitBtnText={isEditing ? "Edit" : "Add"}
            triggerBtn={children}
            validationSchema={schemas.createEditWorkSessionFormSchema}
            initialValues={formData ? initialValues : defaultFormData}
        >
            <CustomInput
                name="startTime"
                label="Start time"
                type="datetime-local"
                step={1}
            />
            <CustomInput
                name="endTime"
                label="End time"
                type="datetime-local"
                step={1}
            />
        </ModalForm>
    );
}

export default CreateEditWorkSessionForm;
