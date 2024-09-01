import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PiUser } from "react-icons/pi";
import { FormLabel, List, Text, useDisclosure, useToast, } from "@chakra-ui/react";

import CustomInput from "@components/ui/CustomInput.tsx";
import ModalForm from "@components/ui/forms/ModalForm.tsx";
import CustomSelect from "@components/ui/CustomSelect.tsx";
import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";

import { createUser, updateUser } from "../api/actions.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { CreateEditMemberFormProps } from "@interfaces/components.ts";
import { ERROR_DURATION, permissionList, workTime } from "@constants";
import { convertTime } from "@utils/formatters.ts";
import { schemas } from "@utils/inputHelpers.ts";

function CreateEditMemberForm({ formData, isEditing, children }: CreateEditMemberFormProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [permissions, setPermissions] = useState(formData?.permissions || [])
    const error = useAppSelector((state) => state.employees.error);
    const loading = useAppSelector((state) => state.employees.loading);
    const roles = useAppSelector((state) => state.roles.roles);
    const roleOptions = roles?.map(role => ({
        name: role.id,
        description: role.name
    }));
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        if (!formData?.permissions) {
            const defaultPermissions = roles[0]?.defaultPermissions || [];
            setPermissions(defaultPermissions);
        }
        return;
    }, [formData?.permissions, isOpen, roles])

    const defaultFormData = {
        name: "",
        surname: "",
        email: "",
        role: roles[0]?.id,
        permissions: roles[0]?.defaultPermissions || [],
        timeload: "08:00"
    }

    const initialValues = {
        id: formData?.id,
        name: formData?.name,
        email: formData?.email,
        surname: formData?.surname,
        role: formData?.role?.id,
        timeload: formData?.timeload,
        permissions: formData?.permissions,
    }

    function handleSubmit(values) {
        setIsSubmitting(true);

        const { role, email, ...rest } = values;
        const data = isEditing ? rest : { ...rest, email };

        const completeValues = {
            ...data,
            timeload: convertTime(values.timeload),
            permissions: permissions,
            roleId: role
        };

        isEditing
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

    function handleChangeRole(e: ChangeEvent<HTMLInputElement>) {
        const roleId = e.target.value;
        const defaultPermissions = roles?.find(({ id }) => id === roleId)?.defaultPermissions || [];

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
                label="Role"
                name="role"
                options={roleOptions}
                onChange={handleChangeRole}
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