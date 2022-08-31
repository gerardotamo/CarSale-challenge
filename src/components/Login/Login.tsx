import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
        if (result.data !== undefined && result.data?.users.length !==0) {
            console.log("RESULTADO", result.data)
            context?.dispatch({type:Type.LOGIN, payload: result.data?.users[0]})
            return navigate('/')
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
            <h1>
                {


                }
            </h1>
            <Section>
                <TextInput placeholder='email' value={email} onChange={(text) => setEmail(text.target.value)} />
                <ErrorText> {error} </ErrorText>
            </Section>
            <Button border='5px' onClick={handleClickLogin} disabled={result.loading}>
                {result.loading ? "Loading..." : "Login"}
            </Button>
        </Form>
    )
}


export default LoginComponent;

const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TextInput = styled('input')`
    
`

const ErrorText = styled('p')`
    color: red;
    margin: 0;
    font-size: 12px;
    align-content: flex-start;
`
const Section = styled('div')`
    
`
