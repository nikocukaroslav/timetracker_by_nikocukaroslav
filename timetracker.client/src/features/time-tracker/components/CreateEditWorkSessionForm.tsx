import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";

import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomInput from "@components/ui/CustomInput.tsx";

import { createWorkSession, updateWorkSession } from "@features/time-tracker/api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { CreateEditWorkSessionFormProps } from "@interfaces/components.ts";
import { schemas } from "@utils/inputHelpers.ts";
import { useDisclosure, useToast } from "@chakra-ui/react";

const defaultFormData = {
    startTime: "",
    endTime: "",
}

function CreateEditWorkSessionForm({ formData, isEditing, children }: CreateEditWorkSessionFormProps) {
    const userId = useAppSelector((state) => state.authentication.user?.id);
    const error = useAppSelector((state) => state.timeTracker.error)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();

    const initialValues = {
        startTime: formData?.startTime,
        endTime: formData?.endTime,
    }


    function handleAddUpdate(values) {
        if (error) {
            toast({
                title: "An error occurred",
                description: error,
                status: "error",
                duration: 15000,
                isClosable: true,
            });
            return;
        }

        const startTimeTimestamp = new Date(values.startTime).getTime();
        const endTimeTimestamp = new Date(values.endTime).getTime();

        if (!isEditing) {
            const newSession = {
                startTime: startTimeTimestamp,
                endTime: endTimeTimestamp,
                userId
            };
            dispatch(createWorkSession(newSession));
        } else {
            const newSessionData = {
                id: formData?.id,
                startTime: startTimeTimestamp,
                endTime: endTimeTimestamp,
                editedAt: new Date().getTime(),
                editorId: userId,
            };

            dispatch(updateWorkSession(newSessionData))
        }
        onClose();
    }

    return (
        <ModalForm
            title={isEditing ? "Edit work session" : "New work session"}
            titleIcon={<PiTimer size="24px"/>}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleAddUpdate}
            submitBtnLoading={false}
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