import { PiHandWaving } from "react-icons/pi";
import { MenuItem } from "@chakra-ui/react";

import { ActionMenuBtnWithConfirmProps } from "@interfaces/components.ts";
import ConfirmWindow from "@components/ui/ConfirmWindow.tsx";

export const ActionMenuTerminateBtn = ({onClick, confirmText}: ActionMenuBtnWithConfirmProps) => (
    <ConfirmWindow onConfirm={onClick} text={confirmText}>
        <MenuItem icon={<PiHandWaving size="24px"/>} onClick={onClick} color="gray.600">
            Terminate
        </MenuItem>
    </ConfirmWindow>
);