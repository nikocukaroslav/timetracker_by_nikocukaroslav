import { Flex, Icon, Img, ListItem, Show, Text, useBreakpointValue } from "@chakra-ui/react";
import TitledText from "@components/ui/TitledText.tsx";
import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import { PiClockUser, PiToolbox } from "react-icons/pi";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import TimeLoadVisualSlider from "@features/accounting/components/TimeLoadVisualSlider.tsx";
import { convertTimeToPercentage } from "@utils/convertors.ts";
import { convertTime } from "@utils/formatters.ts";
import { EmployeeProps } from "@interfaces/components.ts";

function EmployeeStatistic({ employee }: EmployeeProps) {
    const { name, surname, email, role, timeload } = employee;

    const fullName = `${name} ${surname}`;

    const roleTitle = useBreakpointValue({ base: role?.name, xl: "" });
    const timeloadString = timeload ? convertTime(timeload, "hh:mm") : "";

    const convertedTimeload = convertTimeToPercentage(timeload)

    return (
        <>
            <ListItem
                position="relative"
                display="flex"
                alignItems="center"
                p="5"
                rounded="md"
            >
                <Img
                    alt="user-img"
                    w="28px"
                    h="28px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                />
                <Flex align="center" justify="space-between" ml="5">
                    <Flex direction="column" w={{ xl: "16rem", lg: "10rem", base: "7rem" }}>
                        <TitledText title={fullName}>
                            {fullName}
                        </TitledText>
                        <TitledText title={email} fontSize="sm" color="gray.500">
                            {email}
                        </TitledText>
                    </Flex>
                    <CustomVerticalDivider/>
                    <Flex py={2} w={{ xl: 32, base: 8 }} gap={2} align="center" justifyContent="center"
                          lineHeight="1.1">
                        <Icon boxSize={6} as={PiToolbox} title={roleTitle}/>
                        <Show above="xl">
                            <Text>{role?.name}</Text>
                        </Show>
                    </Flex>
                    <CustomVerticalDivider/>
                    <Flex
                        align="center"
                        gap="2"
                        px="5"
                        py="2"
                        bg="gray.200"
                        rounded="md"
                        w={{ lg: 32, base: 16 }}
                    >
                        <PiClockUser size="24px"/>
                        <Show above="lg">
                            <Text>{timeloadString}</Text>
                        </Show>
                    </Flex>
                    <CustomVerticalDivider/>
                </Flex>
                <Flex
                    w="full"
                    gap={4}
                >
                    <Text fontWeight="500">Total:</Text>
                    <TimeLoadVisualSlider timeload={convertedTimeload}/>
                </Flex>
                <Text w="48" align="center" fontWeight="500">{convertedTimeload}%</Text>
            </ListItem>
            <CustomHorizontalDivider/>
        </>
    );
}

export default EmployeeStatistic;