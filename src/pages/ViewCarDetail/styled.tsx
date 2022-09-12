import styled from "styled-components";
import { BaseColor } from "../../config/color";

export const Container = styled("div")`
  color: white;
  height: 100%;
  padding-top: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Column = styled("div")`
  display: flex;
  margin-inline: 50px;
  width: 70%;
  justify-content: space-between;
`;

export const DataContainer = styled("div")`
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  margin-left: 15px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const Section = styled("div")`
  width: 100%;
  display: flex;
`;

export const Title = styled("h1")`
  margin-inline: 50px;
  font-size: calc(15px + 2vmin);
  text-align: left;
  width: 70%;
`;

export const Image = styled("img")`
  height: 60vmin;
  width: 75vmin;
`;

export const InfoItem = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-block: 5px;
`;

export const TextItem = styled("p")`
  margin: 0;
  font-size: 12px;
`;

export const Divider = styled("div")`
  border: 1px solid ${BaseColor.fieldColor};
  opacity: 0.5;
  width: 95%;
`;
