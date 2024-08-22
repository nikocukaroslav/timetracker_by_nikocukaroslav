import { ChangeEvent, useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import {
    Flex,
    Img,
    InputGroup,
    InputLeftElement,
    Popover,
    PopoverAnchor,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

import CustomInput from "@components/ui/CustomInput.tsx";

function CalendarSearch() {
    const [search, setSearch] = useState("");
    const disclosure = useDisclosure();
    const { isOpen, onOpen, onClose } = disclosure;

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim();

        if (search != value || value) {
            setSearch(value);
        }
    }

    useEffect(() => {
        if (search) {
            return onOpen();
        }
        onClose();
    }, [search])

    const User = () => <Flex
        align="center"
        gap="3"
        p={2}
        rounded="md"
        cursor="pointer"
        _hover={{
            bg: "gray.100"
        }}
    >
        <Img
            w="28px"
            h="28px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
            alt="user-img"
        />
        <Flex direction="column">
            <Text>Miha Moskal</Text>
            <Text fontSize="sm" color="gray.500">
                mihamoskal@gmail.com
            </Text>
        </Flex>
    </Flex>

    return (
        <Flex>
            <Popover isOpen={isOpen} onClose={onClose} placement='bottom-end' isLazy>
                <PopoverAnchor>
                    <InputGroup w={64}>
                        <InputLeftElement pointerEvents="none">
                            <PiMagnifyingGlass color="gray.300"/>
                        </InputLeftElement>
                        <CustomInput
                            pl={10}
                            type="text"
                            placeholder="Search сalendar"
                            onChange={handleSearchChange}
                            value={search}/>
                    </InputGroup>
                </PopoverAnchor>
                <PopoverContent>
                    <PopoverHeader>Employees</PopoverHeader>
                    <PopoverCloseButton/>
                    <PopoverBody>
                        <Stack>
                            <User/>
                            <User/>
                            <User/>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}

export default CalendarSearch;
