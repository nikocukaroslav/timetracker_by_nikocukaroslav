import { Center, HStack } from "@chakra-ui/react";
import { PiPencilSimple, PiTrash } from "react-icons/pi";
import ConfirmWindow from "@components/ui/ConfirmWindow.tsx";

interface WorkDayOptionsProps {
    visibleOnHover?: boolean
    onOpen: () => void
    handleDelete: (id: string) => void
    id?: string
}

function WorkDayOptions({ visibleOnHover, onOpen, handleDelete, id }: WorkDayOptionsProps) {
    return (
        <HStack
            display={`${visibleOnHover && "none"}`}
            spacing={1}
            _groupHover={{ display: "flex" }}
        >
            <Center onClick={onOpen} _hover={{ bg: "gray.200" }} p={0.5} rounded="md">
                <PiPencilSimple size={18} title="Edit"/>
            </Center>
            <ConfirmWindow onConfirm={() => handleDelete(id)} text="Delete this work day?">
                <Center _hover={{ bg: "red.100" }} p={0.5} rounded="md">
                    <PiTrash title="Delete" color="red" size={18}/>
                </Center>
            </ConfirmWindow>
        </HStack>
    );
}

export default WorkDayOptions;