import ModalForm from "@components/ui/forms/ModalForm.tsx";
import { PiUser } from "react-icons/pi";
import { schemas } from "@utils/inputHelpers.ts";
import ChoosablePermissionList from "@features/employees/components/ChoosablePermissionList.tsx";
import { ChangeEvent, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import CustomInput from "@components/ui/CustomInput.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useDispatch } from "react-redux";
import { createRole, updateRole } from "@features/roles/api/actions.ts";

const defaultFormData = {
    name: "",
    defaultPermissions: [],
}

function CreateEditRoleForm({ children, formData, isEditing }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const [permissions, setPermissions] = useState(formData?.permissions || [])

    const loading = useAppSelector((state) => state.roles.loading);

    const initialValues = {
        name: formData?.name,
        defaultPermissions: formData?.defaultPermissions,
    }

    function handleSubmit({ name }) {
        const role = {
            id: formData?.id,
            name,
            defaultPermissions: permissions
        }

        isEditing ? dispatch(updateRole(role)) : dispatch(createRole(role))

        onClose();
    }

    function handleChangePermissions(e: ChangeEvent<HTMLInputElement>, permission: string) {
        setPermissions(e.target.checked
            ? [...permissions, permission]
            : permissions?.filter((perm) => perm !== permission));
    }

    return (
        <ModalForm
            title={isEditing ? "Edit role" : "New role"}
            titleIcon={<PiUser size="24px"/>}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitBtnLoading={loading}
            submitBtnText={isEditing ? "Edit" : "Add"}
            triggerBtn={children}
            validationSchema={schemas.createEditRoleFormSchema}
            initialValues={formData ? initialValues : defaultFormData}
        >
            <CustomInput
                label="Name"
                name="name"
                type="text"
            />
            <ChoosablePermissionList handleChangePermissions={handleChangePermissions}
                                     permissions={permissions}/>
        </ModalForm>
    );
}

export default CreateEditRoleForm;