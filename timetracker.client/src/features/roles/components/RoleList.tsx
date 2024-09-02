import { List } from "@chakra-ui/react";
import Role from "@features/roles/components/Role.tsx";
import { useAppSelector } from "@hooks/useAppSelector.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRoles } from "@features/roles/api/actions.ts";

function RoleList() {
    const roleList = useAppSelector(state => state.roles.roles);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    console.log(roleList)

    return (
        <List>
            {roleList.map((role) => (
                <Role key={role.id} role={role}/>
            ))}
        </List>
    );
}

export default RoleList;