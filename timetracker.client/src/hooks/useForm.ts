import { ChangeEvent, useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export function useForm<TDefaultData, TFormData>(defaultData: TDefaultData, formData?: TFormData) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [data, setData] = useState<TDefaultData>(defaultData);

    useEffect(() => {
        if (isOpen && formData) {
            setData({
                ...defaultData,
                ...(formData || {})
            });
        }
    }, [isOpen])

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        setData(prevData => ({...prevData, [field]: e.target.value}));
    }

    const handleChangeValue = (value: string | number, field: string) => {
        setData(prevData => ({...prevData, [field]: value}));
    }

    return {
        data,
        setData,
        isOpen,
        onOpen,
        onClose,
        handleChangeInput,
        handleChangeValue
    }
}