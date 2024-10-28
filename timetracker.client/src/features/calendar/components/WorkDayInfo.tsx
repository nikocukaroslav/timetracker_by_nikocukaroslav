import {
    Center,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text
} from "@chakra-ui/react";
import { RefObject, useRef } from "react";
import { PiClock, PiInfo } from "react-icons/pi";
import TitledText from "@components/ui/TitledText.tsx";
import { convertTime } from "@utils/formatters.ts";
import { WorkDayModel } from "@interfaces/domain.ts";
import WorkDayOptions from "@features/calendar/components/WorkDayOptions.tsx";

function CustomHorizontalDivider() {
    return null;
}

function WorkDayInfo({ workDays, isOpen, onClose, handleDelete, onOpen }: {
    workDays: WorkDayModel[]
    isOpen: boolean,
    onClose: () => void,
    handleDelete: (id: string) => void
    onOpen: () => void
}) {
    const cancelRef: RefObject<HTMLElement> = useRef(null);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={cancelRef}
                isCentered
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Flex gap={2} align="center">
                            <PiInfo size="24px"/>
                            <Text>Work sessions</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <CustomHorizontalDivider/>
                    <ModalBody>
                        <Stack gap={4}>
                            {workDays.map(({ id, startTime, endTime }) => (
                                <Flex justifyContent="space-between">
                                    <Center key={id} gap={2} py={1}>
                                        <PiClock size={20}/>
                                        <TitledText>
                                            {convertTime(startTime as string, "hh:mm")} - {convertTime(endTime as string, "hh:mm")}
                                        </TitledText>
                                    </Center>
                                    <WorkDayOptions key={id} handleDelete={handleDelete} onOpen={onOpen} id={id}/>
                                </Flex>
                            ))}
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WorkDayInfo;