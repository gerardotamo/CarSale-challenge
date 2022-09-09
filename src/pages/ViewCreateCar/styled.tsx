import styled from "styled-components";
import MuiInput from "@mui/material/Input";

export const Container = styled("div")`
  margin-top: 65px;
  color: white;
  display: flex;
  justify-content: center;
`;

export const RegisterContainer = styled("div")`
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 50%;
  margin: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled("h1")``;
export const Form = styled("form")`
  width: 100%;
`;

export const EntryGroup = styled("div")`
  width: 100%;
  margin-block: 15px;
  display: flex;
  flex-direction: column;
`;

export const HeaderOption = styled("h6")`
  margin: 0;
`;

export const Select = styled("select")`
  width: 100%;
`;

export const Option = styled("option")``;

export const RadioButtonGroup = styled("div")`
  align-items: "center";
  display: flex;
`;

export const RadioButton = styled("input")``;

export const Label = styled("label")`
  font-size: 12px;
`;

export const TextInput = styled("input")`
  width: 80%;
`;

export const DatePicker = styled("input")`
  width: 50%;
`;

export const Input = styled(MuiInput)`
  width: 90px;
  margin-left: 15px;
`;

export const SelectOdo = styled("div")`
  display: flex;
`;

export const GroupOptions = styled("div")`
  display: flex;
`;

export const ErrorMessage = styled("small")`
  color: red;
`;
