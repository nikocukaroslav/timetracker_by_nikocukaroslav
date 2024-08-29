import { ChangeEvent, ReactElement, ReactNode } from "react";
import { IconType } from "react-icons";

import { PaginationModel, UserModel } from "./domain.ts";

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

export interface FilterFormProps {
    children: ReactNode;
}

export interface FilterDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSubmit: () => void;
    onClear: () => void;
    triggerBtn: ReactNode;
    children: ReactNode;
}

export interface ModalFormProps {
    initialValues: object;
    validationSchema: object;
    title?: string;
    titleIcon?: ReactNode;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSubmit: (values, actions) => void;
    triggerBtn?: ReactNode;
    submitBtnLoading?: boolean;
    submitBtnText: string;
    children: ReactNode;
}

export interface AuthFormProps {
    initialValues: object;
    validationSchema?: object;
    onSubmit: (values, actions) => void;
    children: ReactNode;
}

export interface CreateEditFormProps {
    isEditing?: boolean;
    children?: ReactNode;
}

export interface CreateEditMemberFormProps extends CreateEditFormProps {
    formData?: UserModel
}

export interface CreateEditWorkSessionFormProps extends CreateEditFormProps {
    formData?: {
        id?: string;
        startTime: string;
        endTime: string;
    },
}

export interface ActionMenuBtnProps {
    onClick?: () => void;
}

export interface ActionMenuBtnWithInfoProps {
    info: ReactNode;
}

export interface ActionMenuBtnWithConfirmProps extends ActionMenuBtnProps {
    confirmText: string;
    onClick: () => void;
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

export interface InfoLabelProps {
    label: string;
    icon?: IconType;
    bgColor?: string;
    borderColor?: string;
    color?: string;
}

export interface PaginationFooterProps {
    pagination: PaginationModel,
    onPageSizeChange: (value: string) => void,
    prevPage: () => void,
    nextPage: () => void
}