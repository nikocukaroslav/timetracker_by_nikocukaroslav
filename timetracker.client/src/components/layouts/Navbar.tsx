import {
    PiCalendarBlank,
    PiChartLine,
    PiClock,
    PiGear,
    PiListChecks,
    PiNote,
    PiUserGear,
    PiUserPlus,
} from "react-icons/pi";
import { AbsoluteCenter, Box, Divider, Flex, Img, Stack } from "@chakra-ui/react";

import NavigationLink from "@components/ui/NavigationLink.tsx";
import CustomNavbarDivider from "@components/ui/CustomNavbarDivider.tsx";
import PermissionChecker from "./PermissionChecker.tsx";

import { APPROVE_REQUESTS, MANAGE_ROLES, MANAGE_USERS } from "@constants";
import { formatTime } from "@utils/formatters.ts";
import { useTimer } from "@features/time-tracker/context/timerContext.tsx";

function Navbar() {
    const { isActive, time } = useTimer();

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

            <Stack direction="column" spacing="1" py="8" alignItems={{ lg: "normal", base: "center" }}>
                <NavigationLink
                    to="time-tracker"
                    icon={PiClock}
                    label={isActive ? formatTime(time) : "Time Tracker"}
                />
                <NavigationLink
                    to="calendar"
                    icon={PiCalendarBlank}
                    label="Calendar"
                />
                <PermissionChecker permissions={[MANAGE_USERS, APPROVE_REQUESTS]}>
                    <CustomNavbarDivider label="Manage"/>
                </PermissionChecker>
                <PermissionChecker permissions={[MANAGE_USERS]}>
                    <NavigationLink
                        to="employees"
                        icon={PiUserPlus}
                        label="Employees"
                    />
                </PermissionChecker>
                <PermissionChecker permissions={[APPROVE_REQUESTS]}>
                    <NavigationLink
                        to="approves"
                        icon={PiListChecks}
                        label="Approves"
                    />
                </PermissionChecker>
                <PermissionChecker permissions={[MANAGE_ROLES]}>
                    <NavigationLink
                        to="roles"
                        icon={PiUserGear}
                        label="Roles"
                    />
                    <NavigationLink
                        icon={PiChartLine}
                        label="Reports"
                        to="reports"/>
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
