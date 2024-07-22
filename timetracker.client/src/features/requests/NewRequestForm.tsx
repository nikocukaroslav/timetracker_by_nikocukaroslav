import {
   Button,
   Divider,
   Flex,
   FormLabel,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Select,
   Text,
   Textarea,
} from "@chakra-ui/react";
import { PiPencilSimpleLine } from "react-icons/pi";

interface UserFormControls {
   isOpen: boolean;
   onClose: () => void;
}

function NewRequestForm({ isOpen, onClose }: UserFormControls) {
   return (
      <Modal
         closeOnOverlayClick={false}
         isOpen={isOpen}
         onClose={onClose}
         isCentered
         size="xl"
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>
               <Flex gap="2" align="center">
                  <PiPencilSimpleLine size="24px" />
                  <Text>New request</Text>
               </Flex>
            </ModalHeader>
            <Divider borderColor="gray.300" borderWidth="1.5px" />
            <ModalBody
               display="flex"
               flexDirection="column"
               gap="2"
               maxHeight="50dvh"
               overflow="auto"
            >
               <FormLabel display="flex" flexDirection="column" gap="1">
                  <Text>Theme</Text>
                  <Select placeholder=" ">
                     <option>Vacation</option>
                     <option>Hospital</option>
                     <option>Complaint</option>
                     <option>Release</option>
                  </Select>
               </FormLabel>
               <FormLabel display="flex" flexDirection="column" gap="1">
                  <Text>Text</Text>
                  <Textarea
                     placeholder="Type your request here..."
                     borderColor="gray.300"
                     focusBorderColor="gray.500"
                     height="30dvh"
                  />
               </FormLabel>
            </ModalBody>
            <ModalFooter>
               <Button variant="ghost" onClick={onClose} mr={3}>
                  Cancel
               </Button>
               <Button colorScheme="gray">Send</Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

export default NewRequestForm;
