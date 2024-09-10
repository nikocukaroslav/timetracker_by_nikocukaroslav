import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { Button } from "@chakra-ui/react";

import { logout, reset } from "@features/authentication/api/actions.ts";
import { useActionState } from "@hooks/useActionState.ts";

function Settings() {
    const { fulfilled } = useActionState(logout);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSignOut() {
        dispatch(logout());
    }

    useEffect(() => {
        if (fulfilled) {
            dispatch(reset());
            navigate("/sign-in");
        }
    }, [fulfilled])

    return <Button onClick={handleSignOut}><PiSignOut/>Logout</Button>;
}

export default Settings;
