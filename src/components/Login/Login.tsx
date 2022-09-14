import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BaseColor } from "../../config/color";
import { Type } from "../../shared/contexts/actions";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import { useFindUser } from "../../shared/graphql/request/userRequest";
import Button from "../Button/Button";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { findUser, errorRequest, data, loading } = useFindUser();

  const { dispatch } = useGeneralContext();

  useEffect(() => {
    if (errorRequest?.message) {
      return setError(errorRequest?.clientErrors + "");
    }

    if (data !== undefined && data?.users.length !== 0) {
      dispatch({ type: Type.LOGIN, payload: data?.users[0] });
    }
    if (data?.users.length === 0) {
      setError("Email not register");
    }
  }, [data, errorRequest, dispatch]);

  const handleClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!isValidEmail(email)) {
        return setError("Email not valid");
      }
      setError("");
      console.log(errorRequest?.graphQLErrors);
      await findUser(email);
      console.log(errorRequest?.cause);
    } catch (e) {
      console.log("ERROR CAtCH", e);
    }
  };

  function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <Form>
      <Section>
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
        />
        <ErrorText> {error} </ErrorText>
      </Section>
      <ButtonLogin
        border="5px"
        onClick={handleClickLogin}
        disabled={loading}
        borderColor={BaseColor.lightBluePrimaryColor}
        disable={loading}
      >
        {loading ? "Loading..." : "Login"}
      </ButtonLogin>
    </Form>
  );
};

export default LoginComponent;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${BaseColor.blueDarkColor};
  padding: 50px;
  justify-content: center;
  border-radius: 15px;
`;

const TextInput = styled("input")`
  height: 30px;
  border: 0px solid;
  border-bottom-width: 2px;
  border-bottom-color: ${BaseColor.lightBluePrimaryColor};
  background-color: ${BaseColor.blueDarkColor};
  outline: none;
  color: ${BaseColor.whiteColor};
  margin-bottom: 15px;
`;

const ErrorText = styled("p")`
  color: red;
  margin: 0;
  font-size: 12px;
  align-content: flex-start;
`;
const Section = styled("div")``;
const ButtonLogin = styled(Button)<{ disable: boolean }>`
  cursor: ${(props) => (props.disable ? "wait" : "pointer")};

  width: 100%;
`;
