import { ChangeEvent, useEffect, useState } from "react";
import {
    AbsoluteCenter,
    Box,
    Popover,
    PopoverAnchor,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    Spinner,
    useDisclosure
} from "@chakra-ui/react";

import { request } from "@utils/request.ts";
import { findEmployeesQuery } from "@features/calendar/api/requests.ts";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import SearchInput from "@components/ui/SearchInput.tsx";
import SearchList from "@components/ui/search/SearchList.tsx";

interface SearchProps {
    userId: string;
    setUserId: (id: string) => void;
    setShowMode?: (showMode: boolean) => void;
}

function Search({ setUserId, setShowMode, userId }: SearchProps) {
    const accountId = useAppSelector(state => state.authentication.user?.id);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const disclosure = useDisclosure();
    const { isOpen, onOpen, onClose } = disclosure;

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.trim();

        if (search != value || value) {
            setSearch(value);
        }
    }

    function handleSelectUser(id: string) {
        setUserId(id);
        setShowMode && setShowMode(true);
        onClose();
    }

    useEffect(() => {
        const searchUsers = setTimeout(async () => {
            if (search) {
                setLoading(true);

                const response = await request(findEmployeesQuery, {
                    input: search
                });

                setLoading(false);

                if (response.ok) {
                    const json = await response.json();
                    const users = json.data.users.find.filter(({ id }: { id: string }) => id != accountId);

                    setUsers(users);
                } else {
                    console.error("Unknown error");
                }
            }
        }, 300);

        if (search) {
            setLoading(true);
            onOpen();
        } else {
            onClose();
        }

        return () => clearTimeout(searchUsers);
    }, [search])

    useEffect(() => {
        if (search === "") {
            setUserId(accountId);
        }
    }, [search]);

    return (
        <Popover isOpen={isOpen} onClose={onClose} placement='bottom-end' isLazy>
            <PopoverAnchor>
                <Box>
                    <SearchInput
                        onClick={() => {
                            setUserId(accountId)
                            setSearch("")
                        }}
                        type="text"
                        placeholder="Search сalendar"
                        onChange={handleSearchChange}
                        value={search}/>
                </Box>
            </PopoverAnchor>
            <PopoverContent>
                <PopoverHeader>Employees</PopoverHeader>
                <PopoverBody position="relative" overflow="auto" minH={10} maxH={300}>
                    {loading
                        ? (
                            <AbsoluteCenter>
                                <Spinner/>
                            </AbsoluteCenter>
                        )
                        : <SearchList
                            users={users}
                            userId={userId}
                            handleSelectUser={handleSelectUser}/>
                    }
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default Search;
