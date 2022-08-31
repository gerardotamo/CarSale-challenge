import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BaseColor } from '../../config/color';
import { Type } from '../../shared/contexts/actions';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';
import { useFindUser } from '../../shared/graphql/request/userRequest';
import Button from '../Button/Button';


const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const { findUser, result } = useFindUser()
    const context = useGeneralContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (result.data !== undefined && result.data?.users.length !== 0) {
            console.log("RESULTADO", result.data)
            context?.dispatch({ type: Type.LOGIN, payload: result.data?.users[0] })
            return navigate('/')
        }
        if (result.data?.users.length === 0) {
            setError('Email not register')
        }
    }, [result.data])

    const handleClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (!isValidEmail(email)) {
                return setError('Email not valid')
            }
            setError('')
            await findUser(email);
            //console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    function isValidEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (
        <Form >

            <Section>
                <TextInput placeholder='Email' value={email} onChange={(text) => setEmail(text.target.value)} />
                <ErrorText> {error} </ErrorText>
            </Section>
            <ButtonLogin border='5px' onClick={handleClickLogin}
                disabled={result.loading} borderColor={BaseColor.lightBluePrimaryColor}
                backgroundColor={BaseColor.blackSecondaryColor} color={BaseColor.lightBluePrimaryColor} disable={result.loading}>
                {result.loading ? "Loading..." : "Login"}
            </ButtonLogin>
        </Form>
    )
}


export default LoginComponent;



const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${BaseColor.blueDarkColor};
    padding: 50px;
    justify-content: center;
    border-radius: 15px;
`

const TextInput = styled('input')`
    height: 30px;
    border: 0px solid;
    border-bottom-width: 2px;
    border-bottom-color: ${BaseColor.lightBluePrimaryColor};
    background-color: ${BaseColor.blueDarkColor};
    outline: none;
    color: ${BaseColor.whiteColor};
    margin-bottom: 15px;
`

const ErrorText = styled('p')`
    color: red;
    margin: 0;
    font-size: 12px;
    align-content: flex-start;
`
const Section = styled('div')`
    
`
const ButtonLogin = styled(Button) <{ disable: boolean }>`
    cursor: ${props => props.disable ? "wait": "pointer" };
    
    width: 100%;
    :hover{
        background-color: ${props => props.disable ? '' : BaseColor.lightBluePrimaryColor};
        color: ${props => props.disable ? '' : BaseColor.whiteColor};
    }
`