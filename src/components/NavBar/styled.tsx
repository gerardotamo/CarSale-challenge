import styled from "styled-components";
import { BaseColor } from "../../config/color";

export const Section = styled("div")`
  right: 0;
  top: 0;
  display: flex;
  width: 100%;
  background-color: ${BaseColor.blueDarkColor};
  justify-content: flex-end;
  position: fixed;
  height: 65px;
  z-index: 9;
`;
export const SectionLogin = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const EmailText = styled("p")<{ color?: string }>`
  margin: 0;
  font-size: 15px;
  margin-right: 5px;
  color: ${(props) => (props.color ? props.color : "white")};
`;
