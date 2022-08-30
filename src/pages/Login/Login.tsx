import React from 'react'
import { Navigate } from 'react-router-dom';
import { useGeneralContext } from '../../shared/contexts/StoreProvider'
import * as styled from './style';

export const Login = () => {
    const context = useGeneralContext();
    const uuid = context?.state.auth.admin.uuid;
    if (uuid) {
        return <Navigate to={"/"} />
    }

    return (
        <styled.Container>
            Login
        </styled.Container>
    )
}
