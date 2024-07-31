import {FormLabel, ListItem, Text} from "@chakra-ui/react";
import CustomCheckbox from "../../../components/ui/CustomCheckbox.tsx";
import {WORKING_PART_TIME} from "../../../constants.ts";
import {WorkingPartTimePermissionItemProps} from "../../../interfaces/components.ts";


function WorkingPartTimePermissionItem({handlePermissions}: WorkingPartTimePermissionItemProps) {
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
                    onChange={(e) =>
                        handlePermissions(e, WORKING_PART_TIME)
                    }
                    disabled
                    checked
                />
                <Text>working part-time</Text>
            </FormLabel>
        </ListItem>
    );
}

export default WorkingPartTimePermissionItem;