import { useDispatch } from "react-redux";
import { PiTimer } from "react-icons/pi";
import { FormLabel, Text } from "@chakra-ui/react";

import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomInput from "@components/ui/CustomInput.tsx";

import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useForm } from "@hooks/useForm.ts";
import { CreateEditWorkDayFormProps } from "@interfaces/components.ts";
import { createWorkDays } from "@features/calendar/api/actions.ts";
import { convertTimeToISOTime } from "@utils/formatters.ts";

const defaultFormData = {
    startTime: "",
    endTime: "",
}

function CreateEditWorkDayForm({
                                   selectedItems,
                                   isOpen,
                                   onOpen,
                                   onClose,
                                   formData,
                                   isEditing
                               }: CreateEditWorkDayFormProps) {
    const formatedFormData = {
        startTime: formData?.startTime || "",
        endTime: formData?.endTime || "",
    }

    const userId = useAppSelector((state) => state.authentication.user?.id);
    const {
        data,
        onOpen: onOpenEvent,
        onClose: onCloseEvent,
        setData,
        handleChangeInput
    } = useForm<typeof defaultFormData, typeof formatedFormData>(defaultFormData, formatedFormData);
    const { startTime, endTime } = data;

    const dispatch = useDispatch();

    function handleOpen() {
        onOpen();
        onOpenEvent();
    }

    function handleClose() {
        onClose();
        onCloseEvent();
    }

    function handleUpdate() {
    }

    function handleAdd() {
        const newWorkDays = {
            days: selectedItems.current,
            startTime: convertTimeToISOTime(data?.startTime),
            endTime: convertTimeToISOTime(data?.endTime),
            userId: userId as string,
        }

        dispatch(createWorkDays(newWorkDays))
        setData(defaultFormData);
    }

    return (
        <ModalForm
            title={isEditing ? "Edit work time" : "New work time"}
            titleIcon={<PiTimer size="24px"/>}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            onSubmit={isEditing ? handleUpdate : handleAdd}
            submitBtnText={isEditing ? "Edit" : "Add"}
        >
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Time start</Text>
                <CustomInput
                    type="time"
                    onChange={(e) => handleChangeInput(e, "startTime")}
                    value={startTime}
                    required
                />
            </FormLabel>
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Time end</Text>
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
