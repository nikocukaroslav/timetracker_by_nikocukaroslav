import {AbsoluteCenter, Box, Divider, Flex, Img, Stack} from "@chakra-ui/react";
import {PiCalendarBlank, PiClock, PiGear, PiListChecks, PiNote, PiUserPlus, PiUsersThree,} from "react-icons/pi";
import NavigationLink from "../ui/NavigationLink.tsx";
import CustomNavbarDivider from "../ui/CustomNavbarDivider.tsx";
import PermissionChecker from "./PermissionChecker.tsx";
import {APPROVE_REQUESTS, MANAGE_TEAMS, MANAGE_USERS, WORKING_PART_TIME} from "../../constants.ts";

function Navbar() {
    return (
        <Flex
            direction="column"
            bg="gray.800"
            h="full"
            color="gray.50"
            py="10"
            gap="2"
            position="relative"
        >
            <Box position="relative" py="4">
                <AbsoluteCenter>
                    <Img
                        alt=""
                        w="36px"
                        h="36px"
                        mx="auto"
                        zIndex="10"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    />
                </AbsoluteCenter>
                <Divider borderColor="gray.600"/>
            </Box>

            <Stack direction="column" spacing="1" py="8">
                <PermissionChecker permissions={[WORKING_PART_TIME]}>
                    <NavigationLink
                        to="time-tracker"
                        icon={PiClock}
                        label="Time Tracker"
                    />
                </PermissionChecker>
                <NavigationLink
                    to="calendar"
                    icon={PiCalendarBlank}
                    label="Calendar"
                />
                <PermissionChecker permissions={[MANAGE_TEAMS, MANAGE_USERS, APPROVE_REQUESTS]}>
                    <CustomNavbarDivider label="Manage"/>
                </PermissionChecker>
                <PermissionChecker permissions={[MANAGE_USERS]}>
                    <NavigationLink
                        to="employees"
                        icon={PiUserPlus}
                        label="Employees"
                    />
                </PermissionChecker>
                <PermissionChecker permissions={[MANAGE_TEAMS]}>
                    <NavigationLink
                        to="teams"
                        icon={PiUsersThree}
                        label="Teams"
                    />
                </PermissionChecker>
                <PermissionChecker permissions={[APPROVE_REQUESTS]}>
                    <NavigationLink
                        to="approves"
                        icon={PiListChecks}
                        label="Approves"
                    />
                </PermissionChecker>
                <CustomNavbarDivider label="Request"/>
                <NavigationLink
                    to="requests"
                    icon={PiNote}
                    label="Requests"
                />
                <CustomNavbarDivider label="Settings"/>
                <NavigationLink
                    to="settings"
                    icon={PiGear}
                    label="Settings"
                />
            </Stack>
        </Flex>
    );
}

export default Navbar;
