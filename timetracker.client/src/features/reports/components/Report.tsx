import { Flex, Img, ListItem, Text, useBreakpointValue } from "@chakra-ui/react";
import TitledText from "@components/ui/TitledText.tsx";
import CustomVerticalDivider from "@components/ui/CustomVerticalDivider.tsx";
import CustomHorizontalDivider from "@components/ui/CustomHorizontalDivider.tsx";
import TimeLoadVisualSlider from "@features/reports/components/TimeLoadVisualSlider.tsx";
import { convertTime } from "@utils/formatters.ts";
import { EmployeeProps } from "@interfaces/components.ts";

function Report({ employee }: EmployeeProps) {
    const { name, surname, email, role, timeload, percent } = employee;

    const fullName = `${name} ${surname}`;

    const roleTitle = useBreakpointValue({ base: role?.name, xl: "" });

    const timeloadString = timeload ? convertTime(timeload, "hh:mm") : "";

    return (
        <>
            <ListItem
                position="relative"
                display="flex"
                alignItems="center"
                p="5"
                rounded="md"
            >
                <Flex minW={80} align="center">
                    <Img
                        alt="user-img"
                        w="28px"
                        h="28px"
                        mr="5"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    />
                    <Flex direction="column" w={{ xl: "16rem", lg: "10rem", base: "7rem" }}>
                        <TitledText title={fullName}>
                            {fullName}
                        </TitledText>
                        <TitledText title={email} fontSize="sm" color="gray.500">
                            {email}
                        </TitledText>
                    </Flex>
                </Flex>
                <CustomVerticalDivider/>
                <Flex py="2" minW={24} maxW={24}>
                    <Text isTruncated>{role?.name}</Text>
                </Flex>
                <CustomVerticalDivider/>
                <Flex minW={24} justifyContent="center">
                    <Text>{timeloadString}</Text>
                </Flex>
                <CustomVerticalDivider/>
                <Flex
                    w="full"
                    gap={4}
                >
                    <Text fontWeight="500">Total:</Text>
                    <TimeLoadVisualSlider percent={percent}/>
                </Flex>
                <Text w="48" align="center" fontWeight="500">{Math.round(percent!)}%</Text>
            </ListItem>
            <CustomHorizontalDivider/>
        </>
    );
}

export default Report;