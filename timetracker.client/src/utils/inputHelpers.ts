import * as Yup from "yup";

const regx = {
    name: /^[A-Za-zа-яА-Я]{2,20}/,
}

export const schemas = {
    createEditMemberFormSchema: Yup.object().shape({
        name: Yup.string()
            .matches(regx.name, "Name must be longer than 2 and shorter than 20 symbols")
            .required("Name is required"),
        surname: Yup.string()
            .matches(regx.name, "Surname must be longer than 2 and shorter than 20 symbols")
            .required("Surname is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        position: Yup.string().required("Position is required"),
        timeload: Yup.string().required("Timeload is required"),
    })
};
