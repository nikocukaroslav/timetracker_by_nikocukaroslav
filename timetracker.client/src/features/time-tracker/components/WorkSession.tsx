import {Divider, Flex, ListItem, Text} from "@chakra-ui/react";
import {formatDate, formatTime} from "../../../utils/formatters.ts";
import {PiTimer} from "react-icons/pi";
import {calculateTotalTime} from "../../../utils/calculateTotalTime.ts";

function WorkSession({workDay}) {
    return (
        <ListItem>
            <Text color="gray.500" fontSize="sm" mb="1">
                {formatDate(new Date(workDay.startTime))}
            </Text>
            <Flex
                p="5"
                bg="gray.50"
                align="center"
                rounded="md"
                boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                justify="space-between"
            >
                <Flex gap="12" align="center">
                    <Flex gap="2" align="center">
                        <PiTimer size="28"/>
                        <Text>
                            Working time:{" "}
                            {formatTime(new Date(workDay.startTime))}-
                            {formatTime(new Date(workDay.endTime))}
                        </Text>
                    </Flex>
                    <Divider
                        orientation="vertical"
                        h="32px"
                        borderColor="gray.500"
                    />
                    <Text>
                        Total:{" "}
                        {calculateTotalTime(
                            new Date(workDay.startTime),
                            new Date(workDay.endTime)
                        )}
                    </Text>
                </Flex>
            </Flex>
        </ListItem>
    );
}

export default WorkSession;