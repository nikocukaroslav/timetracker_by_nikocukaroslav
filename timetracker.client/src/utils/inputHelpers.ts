import * as Yup from "yup";

const regx = {
    name: /^[A-Za-zа-яА-Я]{2}/,
}

export const schemas = {
    createEditMemberFormSchema: Yup.object().shape({
        name: Yup.string()
            .matches(regx.name, "Name must be longer than 2 symbols")
            .required("Name is required"),
        surname: Yup.string()
            .matches(regx.name, "Surname must be longer than 2 symbols")
            .required("Surname is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        role: Yup.string().required("Role is required"),
        timeload: Yup.string().required("Timeload is required"),
    }),
    createEditWorkDayFormSchema: Yup.object().shape({
        startTime: Yup.string()
            .required("Work start is required")
            .test("is-workStart-before-workEnd", "Work start must be before work end", function (value) {
                const { endTime } = this.parent;
                return !endTime || new Date(`1970-01-01T${value}:00Z`) < new Date(`1970-01-01T${endTime}:00Z`);
            }),
        endTime: Yup.string().required("Work end is required"),
    }),
    createEditWorkSessionFormSchema: Yup.object().shape({
        startTime: Yup.date()
            .test("is-startTime-before-endTime", "Start time must be before end time", function (value) {
                const { endTime } = this.parent;
                return !endTime || value <= endTime;
            })
            .required("Work Start is required"),
        endTime: Yup.date()
            .required("End time is required")
            .test("is-duration-valid", "Work session cannot exceed 24 hours", function (value) {
                const { startTime } = this.parent;
                if (!startTime || !value) return true;
                const duration = (new Date(value) - new Date(startTime)) / (1000 * 60 * 60);
                return duration < 24;
            }),
    }),
    createEditRoleFormSchema: Yup.object().shape({
        name: Yup.string()
            .matches(regx.name, "Role name must be longer than 2 symbols")
            .required("Name is required"),
    }),
    signInSchema: Yup.object().shape({
        email: Yup.string().required("Login is required"),
        password: Yup.string().required("Password is required"),
    }),
    resetPasswordSchema: Yup.object().shape({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Repeat password is required"),
    })
};
