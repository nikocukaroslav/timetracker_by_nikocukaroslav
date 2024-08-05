import {ChangeEvent, ChangeEventHandler, ReactNode} from "react";
import {IconType} from "react-icons";
import {User} from "./domain.ts";

export interface CheckboxProps {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    checked?: boolean;
    readOnly?: boolean;
}

export interface InputProps {
    type: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>,
    value?: string;
    readOnly?: boolean;
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
    employee: User
}

interface Permission {
    name: string;
    description: string;
}

export interface PermissionItemProps {
    permission: Permission;
    permissions: string[];
    handlePermissions: (e: ChangeEvent<HTMLInputElement>, name: string) => void
}

export interface RandomPasswordButtonProps {
    setRandomPassword: () => void
}

export interface UserFormControls {
    isOpen: boolean;
    onClose: () => void;
    isEditing?: boolean;
}