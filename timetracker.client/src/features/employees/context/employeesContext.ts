import { createContext } from "react";
import { EmployeesContextType } from "@features/employees/types/employees.ts";

export const EmployeesContext = createContext<EmployeesContextType | null>(null);