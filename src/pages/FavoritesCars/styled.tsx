import styled from "styled-components";
import { BaseColor } from "../../config/color";

export const Container = styled("div")`
  padding-top: 120px;
  color: ${BaseColor.whiteColor};
`;

export const Title = styled("h1")<{ color?: string }>`
  margin: 0;
  font-size: 18px;
  color: ${(props) => (props.color ? props.color : "white")};
`;

export const Image = styled("img")`
  height: 50vh;
  width: 80vh;
`;
