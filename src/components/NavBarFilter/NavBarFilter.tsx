import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { BaseColor } from "../../config/color";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";

interface Option {
  value: string;
  name: string;
}

const NavBarFilter = () => {
  const [search, setSearch] = useState("");
  const flag: boolean = useLocation().pathname.includes("favorites");

  const handleSearchSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("press");
  };

  return (
    <>
      <Container>
        <Section>
          {!flag ? (
            <Link to={"cars/create"}>
              <Button>Create</Button>
            </Link>
          ) : null}
        </Section>
        <SearchForm name="name">
          <SearchBar
            placeholder="search..."
            type="text"
            value={search}
            name="search"
            onChange={(text) => setSearch(text.target.value)}
          />
          <Button onClick={handleSearchSubmit}>Search</Button>
        </SearchForm>
        <Section style={{ justifyContent: "flex-end" }}>
          <OrderText>Order by</OrderText>
          <OrderButton>Year</OrderButton>
        </Section>
      </Container>
      <Outlet />
    </>
  );
};

export default NavBarFilter;

const Container = styled("div")`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  grid-gap: 20px;
  padding-inline: 20px;
  background-color: ${BaseColor.blackSecondaryColor};
  position: fixed;
  margin-top: 65px;
  width: 96%;
  height: 45px;
`;

const Section = styled("div")`
  display: flex;
  align-items: center;
`;
const SearchForm = styled("form")`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SearchBar = styled("input")`
  height: 25px;
`;

const OrderButton = styled(Button)`
  width: 80px;
  height: 25px;
`;

const OrderText = styled("p")`
  margin: 0;
  font-size: 12px;
  color: ${BaseColor.lightBluePrimaryColor};
`;
