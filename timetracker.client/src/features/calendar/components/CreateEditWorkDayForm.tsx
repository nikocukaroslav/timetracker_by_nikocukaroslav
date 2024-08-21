import { PiTimer } from "react-icons/pi";
import { FormLabel, Text } from "@chakra-ui/react";

import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomInput from "@components/ui/CustomInput.tsx";

import { useForm } from "@hooks/useForm.ts";
import { CreateEditWorkDayFormProps } from "@interfaces/components.ts";

const defaultFormData = {
    startTime: "",
    endTime: "",
}

function CreateEditWorkDayForm({
                                   disclosure,
                                   onCreate,
                                   onUpdate,
                                   formData,
                                   isEditing
                               }: CreateEditWorkDayFormProps) {
    const {
        data,
        isOpen,
        onOpen,
        onClose,
        setData,
        handleChangeInput
    } = useForm<typeof defaultFormData, typeof formData>(defaultFormData, formData, disclosure);
    const { startTime, endTime } = data;

    function handleUpdate() {
        if (onUpdate) {
            onUpdate(data);
        }
    }

    function handleCreate() {
        if (onCreate) {
            onCreate(data);
        }
        setData(defaultFormData);
    }

    return (
        <ModalForm
            title={isEditing ? "Edit work day" : "New work day"}
            titleIcon={<PiTimer size="24px"/>}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={isEditing ? handleUpdate : handleCreate}
            submitBtnText={isEditing ? "Edit" : "Add"}
        >
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Work start</Text>
                <CustomInput
                    type="time"
                    onChange={(e) => handleChangeInput(e, "startTime")}
                    value={startTime}
                    required
                />
            </FormLabel>
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Work end</Text>
                <CustomInput
                    type="time"
                    onChange={(e) => handleChangeInput(e, "endTime")}
                    value={endTime}
                    required
                />
            </FormLabel>
        </ModalForm>
    );
}

export default CreateEditWorkDayForm;
