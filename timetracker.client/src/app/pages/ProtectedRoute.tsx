import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const loginStatus = useSelector(state => state.authentication.loginStatus)

    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            navigate("/sign-in");
        }
    }, [loginStatus, navigate]);

    return loginStatus ? children : null;

}

export default ProtectedRoute;