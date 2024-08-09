import { FormLabel, ListItem, Text } from "@chakra-ui/react";

import CustomCheckbox from "@components/ui/CustomCheckbox.tsx";

import { PermissionItemProps } from "@interfaces/components.ts";

function PermissionItem({permission, permissions, handlePermissions}: PermissionItemProps) {
    return (
        <ListItem>
            <FormLabel
                m="0"
                display="flex"
                fontWeight="normal"
                gap="2"
                alignContent="center"
            >
                <CustomCheckbox
                    checked={permissions?.includes(permission.name)}
                    onChange={(e) =>
                        handlePermissions(e, permission.name)
                    }
                />
                <Text>{permission.description}</Text>
            </FormLabel>
        </ListItem>
    );
}

export default PermissionItem;