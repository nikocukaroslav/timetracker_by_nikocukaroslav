import { MenuItem } from "@chakra-ui/react";

import { ActionMenuExpandedBtnProps } from "@interfaces/components.ts";
import ConfirmWindow from "@components/ui/ConfirmWindow.tsx";

export const ActionMenuExpandedBtn = ({onClick, confirmText, buttonName, buttonIcon, buttonColor}: ActionMenuExpandedBtnProps) => (
    <ConfirmWindow onConfirm={onClick} text={confirmText}>
        <MenuItem icon={buttonIcon} onClick={onClick} color={`${buttonColor}`}>
            {buttonName}
        </MenuItem>
    </ConfirmWindow>
);