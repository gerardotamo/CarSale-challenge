import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import { useGeneralContext } from '../../shared/contexts/StoreProvider'
import * as styled from './style';
import { useFindUser } from '../../shared/graphql/request/userRequest';
import LoginComponent from '../../components/Login/Login';


export const Login = () => {


    const context = useGeneralContext();
    const uuid = context?.state.auth.admin.uuid;


    if (uuid !== undefined) {
        return <Navigate to={"/"} />
    }


    return (
        <styled.Container>
            <LoginComponent/>
        </styled.Container>
    )
}
