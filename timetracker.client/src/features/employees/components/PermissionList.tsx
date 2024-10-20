import { Flex, Text } from "@chakra-ui/react";
import { permissionList } from "@constants";

function PermissionList({ value }) {
    return (
        <Flex gap="2" wrap="wrap">
            {
                value && value.length > 0 ?
                    permissionList
                        .filter(permission => value?.includes(permission.name))
                        .map((permission, index) => (
                            <Text
                                px="1"
                                bg="gray.200"
                                rounded="md"
                                key={index}
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                            >{`${permission.description} `}</Text>
                        )) :
                    <Text>No permissions</Text>
            }
        </Flex>
    );
}

export default PermissionList;