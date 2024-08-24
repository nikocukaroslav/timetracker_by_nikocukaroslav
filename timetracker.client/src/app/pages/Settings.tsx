import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { Button } from "@chakra-ui/react";

import { logout, reset } from "@features/authentication/api/actions.ts";

function Settings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSignOut() {
        dispatch(logout());
        dispatch(reset());
        navigate("/sign-in");
    }

    return <Button onClick={handleSignOut}><PiSignOut/>Logout</Button>;
}

export default Settings;
