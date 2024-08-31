import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiUser } from "react-icons/pi";
import { FormLabel, List, Text, useDisclosure, useToast, } from "@chakra-ui/react";

import CustomInput from "@components/ui/CustomInput.tsx";
import ModalForm from "@components/ui/forms/ModalForm.tsx";

import { createUser, updateUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { CreateEditMemberFormProps } from "@interfaces/components.ts";
import { ERROR_DURATION, permissionList, positionList, workTime } from "@constants";
import { convertTime } from "@utils/formatters.ts";
import { schemas } from "@utils/inputHelpers.ts";
import CustomSelect from "@components/ui/CustomSelect.tsx";
import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";

const defaultFormData = {
    name: "",
    surname: "",
    email: "",
    position: positionList[0].name,
    permissions: positionList[0].defaultPermissions,
    timeload: "08:00"
}

function CreateEditMemberForm({ formData, isEditing, children }: CreateEditMemberFormProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [permissions, setPermissions] = useState(formData?.permissions || [])

    const error = useAppSelector((state) => state.employees.error);
    const loading = useAppSelector((state) => state.employees.loading);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        const defaultPermissions = positionList.find(({ name }) => name === "DEVELOPER")?.defaultPermissions || [];
        setPermissions(defaultPermissions);
        return;
    }, [formData?.permissions, isOpen])

    const initialValues = {
        id: formData?.id,
        name: formData?.name,
        email: formData?.email,
        surname: formData?.surname,
        position: formData?.position,
        timeload: formData?.timeload,
        permissions: formData?.permissions,
    }

    function handleSubmit(values) {
        setIsSubmitting(true);
        const { email, ...rest } = values;
        const data = isEditing ? rest : values;

        const completeValues = {
            ...data,
            timeload: convertTime(values.timeload),
            permissions: permissions,
        };

        (isEditing && !error)
            ? dispatch(updateUser(completeValues))
            : dispatch(createUser(completeValues));
    }


    useEffect(() => {
        if (!isSubmitting || loading || !isOpen)
            return
        setIsSubmitting(false)
        if (error) {
            toast({
                title: "An error occurred",
                description: error,
                status: "error",
                duration: ERROR_DURATION,
                isClosable: true,
            });
            return;
        }
        if (!error)
            onClose()
    }, [error, isOpen, isSubmitting, loading, onClose, toast]);

    function handleChangePermissions(e: ChangeEvent<HTMLInputElement>, permission: string) {
        setPermissions(e.target.checked
            ? [...permissions, permission]
            : permissions?.filter((perm) => perm !== permission));
    }

    function handleChangePosition(e: ChangeEvent<HTMLSelectElement>) {
        const position = e.target.value;
        const defaultPermissions = positionList.find(({ name }) => name === position)?.defaultPermissions || [];

        setPermissions(defaultPermissions);
    }

    const workTimeList = workTime.map(time => ({
        name: time,
        description: time
    }));

    return (
        <ModalForm
            title={isEditing ? "Edit member" : "New member"}
            titleIcon={<PiUser size="24px"/>}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitBtnLoading={loading}
            submitBtnText={isEditing ? "Edit" : "Add"}
            triggerBtn={children}
            validationSchema={schemas.createEditMemberFormSchema}
            initialValues={formData ? initialValues : defaultFormData}
        >
            <CustomInput
                label="Name"
                name="name"
                type="text"
            />
            <CustomInput
                label="Surname"
                name="surname"
                type="text"
            />
            <CustomInput
                label="Email"
                name="email"
                type="email"
                isDisabled={isEditing}
            />
            <CustomSelect
                label="Position"
                name="position"
                options={positionList}
                onChange={handleChangePosition}
            />
            <CustomSelect
                label="Work Time"
                name="timeload"
                options={workTimeList}
            />
            <FormLabel m="0">
                <Text>Permissions</Text>
            </FormLabel>
            <List
                flexWrap="wrap"
                display="flex"
                gap="4"
                lineHeight="1"
                borderWidth="1px"
                p="3"
                rounded="md"
            >
                {permissionList.map((permission) => (
                    <CustomCheckbox
                        key={permission.name}
                        label={permission.description}
                        value={permission.name}
                        onChange={(e) => handleChangePermissions(e, permission.name)}
                        isChecked={permissions?.includes(permission.name)}
                    />
                ))}
            </List>
        </ModalForm>
    );
}

export default CreateEditMemberForm;