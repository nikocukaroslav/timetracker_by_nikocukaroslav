import {Flex, ListItem, Text} from "@chakra-ui/react";
import dateFormatConverter, {formatTime} from "../../../utils/formatters.ts";
import {PiTimer} from "react-icons/pi";
import CustomVerticalDivider from "../../../components/ui/CustomVerticalDivider.tsx";
import ConfirmActionWindow from "../../../components/ui/ConfirmActionWindow.tsx";
import {useState} from "react";
import CustomHamburgerMenu from "../../../components/ui/CustomHamburgerMenu.tsx";

function WorkSession({workSession}) {
    const totalTime: number = Math.floor((workSession.endTime - workSession.startTime) / 1000)

    const [activeDeleting, setActiveDeleting] = useState(false);

    function handleActiveDeleting() {
        setActiveDeleting(!activeDeleting);
    }

    function confirmDeleting() {
        setActiveDeleting(true);
    }


    return (
        <>
            <ListItem>
                <Text color="gray.500" fontSize="sm" mb="1">
                    {dateFormatConverter(workSession.startTime, "full")}
                </Text>
                <Flex
                    p="5"
                    bg="gray.50"
                    align="center"
                    rounded="md"
                    boxShadow="0 0 2px 2px rgba(0, 0, 0, 0.1)"
                    justify="space-between"
                >
                    <Flex align="center">
                        <Flex gap="2" align="center" w="96">
                            <PiTimer size="28"/>
                            <Text>
                                Working time:{" "}
                                {dateFormatConverter(workSession.startTime, "long-time")} - {dateFormatConverter(workSession.endTime, "long-time")}
                            </Text>
                        </Flex>
                        <CustomVerticalDivider/>
                        <Text w="36">
                            Total:{" "}
                            {formatTime(totalTime)}
                        </Text>
                    </Flex>
                    <CustomHamburgerMenu getData confirmAction={confirmDeleting}/>
                </Flex>
            </ListItem>
            <ConfirmActionWindow
                onDelete={() => {
                }}
                isOpen={activeDeleting}
                text={`Delete this work session`}
                onClose={handleActiveDeleting}/>
        </>
    );
}

export default WorkSession;
