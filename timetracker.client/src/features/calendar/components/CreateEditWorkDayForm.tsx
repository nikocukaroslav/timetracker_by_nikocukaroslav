import { PiTimer } from "react-icons/pi";

import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomInput from "@components/ui/CustomInput.tsx";
import { CreateEditWorkDayFormProps } from "@features/calendar/types/components.ts";
import { schemas } from "@utils/inputHelpers.ts";

const defaultFormData = {
    startTime: "",
    endTime: "",
}

function CreateEditWorkDayForm({ disclosure, onCreate, onUpdate, isEditing, formData }: CreateEditWorkDayFormProps) {
    const { isOpen, onOpen, onClose } = disclosure;

    const initialValues = {
        startTime: formData?.startTime,
        endTime: formData?.endTime,
    }

    function handleUpdate(values) {
        if (onUpdate) {
            onUpdate(values);
        }
    }

    function handleCreate(values, actions) {
        if (onCreate) {
            onCreate(values);
        }
        actions.resetForm();
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
            validationSchema={schemas.createEditWorkDayFormSchema}
            initialValues={formData ? initialValues : defaultFormData}
        >
            <CustomInput
                name="startTime"
                label="Work start"
                type="time"
            />
            <CustomInput
                name="endTime"
                label="Work end"
                type="time"
            />
        </ModalForm>
    );
}

export default CreateEditWorkDayForm;
