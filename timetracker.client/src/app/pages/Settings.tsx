import NavigationLink from "../../components/ui/NavigationLink.tsx";
import {PiSignOut} from "react-icons/pi";

function Settings() {
    return <NavigationLink to="/sign-in" label="Logout" icon={PiSignOut}></NavigationLink>;
}

export default Settings;
