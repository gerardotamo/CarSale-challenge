import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useGeneralContext } from '../../shared/contexts/StoreProvider'
import * as styled from './style';
import { useFindUser } from '../../shared/graphql/request/userRequest';


export const Login = () => {

    const context = useGeneralContext();
    const uuid = context?.state.auth.admin.uuid;

    const { findUser, result } = useFindUser("George@test.co");

    console.log(result.data)

    if (uuid) {
        return <Navigate to={"/"} />
    }


    return (
        <styled.Container>
            <div onClick={() => findUser()}>
                Login
            </div>
        </styled.Container>
    )
}
