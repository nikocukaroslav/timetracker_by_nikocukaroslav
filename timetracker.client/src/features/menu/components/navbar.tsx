import { Box, Divider, Flex, Img, Stack } from "@chakra-ui/react";
import {
   PiCalendarBlank,
   PiClock,
   PiGear,
   PiListChecks,
   PiNote,
   PiUserPlus,
   PiUsersThree,
} from "react-icons/pi";
import NavigationLink from "../../../components/ui/NavigationLink.tsx";

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
         <Box>
            <Img
               alt=""
               w="36px"
               h="36px"
               mx="auto"
               zIndex="10"
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
            />
            <Divider
               orientation="horizontal"
               borderColor="gray.600"
               mt="-18px"
            />
         </Box>
         <Stack direction="column" spacing="1" py="8">
            <NavigationLink
               to="time-tracker"
               icon={PiClock}
               label="Time Tracker"
            />
            <NavigationLink
               to="calendar"
               icon={PiCalendarBlank}
               label="Calendar"
            />
            <NavigationLink
               to="employees"
               icon={PiUserPlus}
               label="Employees"
            />
            <NavigationLink to="teams" icon={PiUsersThree} label="Teams" />
            <NavigationLink
               to="approves"
               icon={PiListChecks}
               label="Approves"
            />
            <NavigationLink to="requests" icon={PiNote} label="Requests" />
            <NavigationLink to="settings" icon={PiGear} label="Settings" />
         </Stack>
      </Flex>
   );
}

export default Navbar;
