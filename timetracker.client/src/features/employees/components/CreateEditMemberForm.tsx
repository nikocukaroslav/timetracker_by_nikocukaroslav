import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { PiUser } from "react-icons/pi";
import { FormLabel, List, Select, Text, useDisclosure, } from "@chakra-ui/react";

import CustomInput from "@components/ui/CustomInput.tsx";
import ModalForm from "@components/ui/forms/ModalForm.tsx";
import PermissionItem from "./PermissionItem.tsx";
import TimeSelect from "@components/ui/TimeSelect.tsx";

import { createUser, updateUser } from "../api/actions.ts";
import { useForm } from "@hooks/useForm.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { CreateEditMemberFormProps } from "@interfaces/components.ts";
import { permissionList, positionList } from "@constants";
import { convertTime } from "@utils/formatters.ts";
import { schemas } from "@utils/inputHelpers.ts";

const defaultFormData = {
    name: "",
    surname: "",
    email: "",
    position: positionList[0].name,
    permissions: positionList[0].defaultPermissions,
    timeload: "08:00"
}

function CreateEditMemberForm({ formData, isEditing, children }: CreateEditMemberFormProps) {
    const {
        data,
        setData,
        handleChangeInput,
    } = useForm<typeof defaultFormData, typeof formData>(defaultFormData, formData);
    const { name, surname, position, permissions, timeload } = data;

    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleSubmit(values, actions) {
        const completeValues = {
            ...values,
            timeload: convertTime(timeload),
        };

        isEditing ? handleUpdate() : dispatch(createUser(completeValues));

        actions.resetForm();
        onClose();
    }

    const loading = useAppSelector(state => state.employees.loading)
    const dispatch = useDispatch();

    function handleUpdate() {
        const newUserData = {
            id: formData?.id,
            name,
            surname,
            position,
            permissions,
            timeload: convertTime(timeload),
        };

        dispatch(updateUser(newUserData))
    }

    function handleChangePermissions(e: ChangeEvent<HTMLInputElement>, permission: string) {
        setData(prevState => ({
            ...prevState,
            permissions: e.target.checked
                ? [...prevState.permissions as string[], permission]
                : prevState.permissions?.filter((perm) => perm !== permission)
        }));
    }

    function handleChangePosition(e: ChangeEvent<HTMLSelectElement>) {
        const position = e.target.value;
        const defaultPermissions = positionList.find(({ name }) => name === position)?.defaultPermissions || [];

        setData(prevState => ({
            ...prevState,
            position,
            permissions: defaultPermissions
        }));
    }

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
            initialValues={defaultFormData}
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
            <FormLabel display="flex" flexDirection="column" gap="1">
                <Text>Position</Text>
                <Select
                    variant="outline"
                    borderColor="gray.300"
                    focusBorderColor="gray.500"
                    onChange={handleChangePosition}
                    value={position}
                >
                    {
                        positionList.map(position =>
                            <option key={position.name} value={position.name}>{position.description}</option>
                        )
                    }
                </Select>
            </FormLabel>
            <FormLabel display="flex" flexDirection="column">
                <Text>Work time</Text>
                <TimeSelect
                    onChange={(e) => handleChangeInput(e, "timeload")}
                    value={timeload}
                />
            </FormLabel>
            <FormLabel m="0">
                <Text>Permissions</Text>
            </FormLabel>
            <List
                flexWrap="wrap"
                display="flex"
                gap="4"
                lineHeight="1"
                borderWidth="1px"
                p="2"
                rounded="md"
            >
                {permissionList.map((permission) =>
                    <PermissionItem
                        key={permission.name}
                        permission={permission}
                        permissions={permissions}
                        handlePermissions={handleChangePermissions}/>
                )}
            </List>
        </ModalForm>
    );
}

export default CreateEditMemberForm;