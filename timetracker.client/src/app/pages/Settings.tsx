import {PiSignOut} from "react-icons/pi";
import {Button} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {logout} from "../../features/authentication/api/actions.ts";

function Settings() {
    const dispatch = useDispatch()
    return <Button onClick={() => dispatch(logout())}><PiSignOut/>Logout</Button>;
}

export default Settings;
