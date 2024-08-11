import { PiTrash } from "react-icons/pi";
import { MenuItem } from "@chakra-ui/react";

import { ActionMenuBtnWithConfirmProps } from "@interfaces/components.ts";
import ConfirmWindow from "@components/ui/ConfirmWindow.tsx";

export const ActionMenuDeleteBtn = ({onClick, confirmText}: ActionMenuBtnWithConfirmProps) => (
    <ConfirmWindow onConfirm={onClick} text={confirmText}>
        <MenuItem icon={<PiTrash size="24px"/>} onClick={onClick} color="red.600">
            Delete
        </MenuItem>
    </ConfirmWindow>
);