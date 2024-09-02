import { FormLabel, List, Text } from "@chakra-ui/react";
import { permissionList } from "@constants";
import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";

function ChoosablePermissionList({ handleChangePermissions, permissions }) {
    return (
        <>
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
        </>
    );
}

export default ChoosablePermissionList;