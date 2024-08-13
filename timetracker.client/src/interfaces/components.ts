import { ChangeEvent, ChangeEventHandler, ReactNode, ReactElement } from "react";
import { IconType } from "react-icons";

import { UserModel } from "./domain.ts";

export interface CheckboxProps {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    checked?: boolean;
    readOnly?: boolean;
}

export interface InputProps {
    type: string;
    step?: number;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string;
    readOnly?: boolean;
    isDisabled?: boolean;
}

export interface StackProps {
    label: string,
}

export interface NavigationLinkProps {
    icon: IconType;
    label: string;
    to: string;
}

export interface LayoutProps {
    children: ReactNode;
    redirectToNotFound?: boolean;
    permissions?: string[];
}

export interface EmployeeProps {
    employee: UserModel
}

interface Permission {
    name: string;
    description: string;
}

export interface PermissionItemProps {
    permission: Permission;
    permissions?: string[];
    handlePermissions: (e: ChangeEvent<HTMLInputElement>, name: string) => void
}

export interface RandomPasswordButtonProps {
    setRandomPassword: () => void
}

export interface ModalFormProps {
    title?: string;
    titleIcon?: ReactNode;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSubmit: () => void;
    triggerBtn: ReactNode;
    submitBtnLoading: boolean;
    submitBtnText: string;
    children: ReactNode;
}

export interface CreateEditFormProps {
    isEditing?: boolean;
    children: ReactNode;
}

export interface CreateEditMemberFormProps extends CreateEditFormProps {
    formData?: UserModel
}

export interface CreateEditWorkSessionFormProps extends CreateEditFormProps {
    formData?: {
        id?: string,
        startTime: string,
        endTime: string,
    },
}

export interface ActionMenuBtnProps {
    onClick?: () => void;
}

export interface ActionMenuBtnWithInfoProps {
    info: ReactNode ;
}

export interface ActionMenuBtnWithConfirmProps extends ActionMenuBtnProps {
    confirmText: string;
}

export interface ActionMenuExpandedBtnProps extends ActionMenuBtnWithConfirmProps {
    buttonName: string;
    buttonIcon: ReactElement;
    buttonColor: string;
}

export interface ConfirmWindowProps {
    onConfirm: () => void;
    text: string;
    children: ReactNode;
}

export interface InfoWindowProps {
    info: ReactNode;
    children: ReactNode;
}

export interface CustomSliderProps {
    onChange: (value: number) => void,
    value?: number
}