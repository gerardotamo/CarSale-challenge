import styled from "styled-components";

export const Container = styled("div")`
  color: white;
  height: 100%;
  padding-top: 110px;
  width: 100%;
`;
export const TableContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  margin-top: 20px;
  margin: 30px;
  align-items: center;
  padding-block: 10px;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 32%);
  border-radius: 5px 0 0 5px;
`;
export const Title = styled("h1")<{ color?: string }>`
  margin: 0;
  font-size: 18px;
  color: ${(props) => (props.color ? props.color : "white")};
`;

export const Image = styled("img")`
  height: 116px;
  width: 155px;
`;
