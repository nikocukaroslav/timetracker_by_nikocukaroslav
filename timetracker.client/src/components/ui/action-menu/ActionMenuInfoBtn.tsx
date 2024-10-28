import { PiInfo } from "react-icons/pi";
import { MenuItem } from "@chakra-ui/react";

import { ActionMenuBtnWithInfoProps } from "@interfaces/components.ts";
import InfoWindow from "@components/ui/action-menu/InfoWindow.tsx";

export const ActionMenuInfoBtn = ({ info }: ActionMenuBtnWithInfoProps) => (
    <InfoWindow info={info}>
        <MenuItem icon={<PiInfo size="24px"/>}>
            Info
        </MenuItem>
    </InfoWindow>
);