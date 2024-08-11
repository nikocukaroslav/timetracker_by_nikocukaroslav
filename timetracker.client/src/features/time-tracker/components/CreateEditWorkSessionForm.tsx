import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";
import { FormLabel, Text } from "@chakra-ui/react";

import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomInput from "@components/ui/CustomInput.tsx";

import { addWorkSession, editWorkSession } from "@features/time-tracker/api/actions.ts";
import { useForm } from "@hooks/useForm.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { CreateEditWorkSessionFormProps } from "@interfaces/components.ts";

const defaultFormData = {
    startTime: "",
    endTime: "",
}

function CreateEditWorkSessionForm({formData, isEditing, children}: CreateEditWorkSessionFormProps) {
    const userId = useAppSelector((state) => state.authentication.user?.id);
    const {
        data,
        isOpen,
        onOpen,
        onClose,
        setData,
        handleChangeInput
    } = useForm<typeof defaultFormData, typeof formData>(defaultFormData, formData);
    const {startTime, endTime} = data;

    const dispatch = useDispatch();

    function handleUpdate() {
        const startTimeTimestamp = new Date(startTime).getTime();
        const endTimeTimestamp = new Date(endTime).getTime();

        const newSessionData = {
            id: formData?.id,
            startTime: startTimeTimestamp,
            endTime: endTimeTimestamp,
            editedAt: new Date().getTime(),
            editorId: userId,
        };

        dispatch(editWorkSession(newSessionData))
    }

    function handleAdd() {
        const startTimeTimestamp = new Date(startTime).getTime();
        const endTimeTimestamp = new Date(endTime).getTime();

        const newSession = {
            startTime: startTimeTimestamp,
            endTime: endTimeTimestamp,
            userId
        };

        dispatch(addWorkSession(newSession));
        setData(defaultFormData);
    }

    return (
        <ModalForm
            title={isEditing ? "Edit work session" : "New work session"}
            titleIcon={<PiTimer size="24px"/>}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={isEditing ? handleUpdate : handleAdd}
            submitBtnLoading={false}
            submitBtnText={isEditing ? "Edit" : "Add"}
            triggerBtn={children}
        >
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Time start</Text>
                <CustomInput
                    type="datetime-local"
                    step={1}
                    onChange={(e) => handleChangeInput(e, "startTime")}
                    value={startTime}
                    required
                />
            </FormLabel>
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Time end</Text>
                <CustomInput
                    type="datetime-local"
                    step={1}
                    onChange={(e) => handleChangeInput(e, "endTime")}
                    value={endTime}
                    required
                />
            </FormLabel>
        </ModalForm>
    );
}

export default CreateEditWorkSessionForm;