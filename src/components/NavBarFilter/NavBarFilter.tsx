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

  const select: Option[] = [{ value: "year", name: "year" }];

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
          <SelectOptions>
            {select.map((item: Option, index: number) => {
              return (
                <Options value={item.value} key={index}>
                  {item.name}{" "}
                </Options>
              );
            })}
          </SelectOptions>
        </Section>
      </Container>
      <Outlet />
    </>
  );
};

export default NavBarFilter;

const Container = styled("div")`
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
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
const SelectOptions = styled("select")`
  width: 100xpx;
`;
const Options = styled("option")``;
