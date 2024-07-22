import { Checkbox } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface CheckboxProps {
   onClick?: MouseEventHandler<HTMLDivElement>;
}

function CustomCheckbox({ onClick }: CheckboxProps) {
   return (
      <Checkbox onClick={onClick} colorScheme="gray" borderColor="gray.500" />
   );
}

export default CustomCheckbox;
