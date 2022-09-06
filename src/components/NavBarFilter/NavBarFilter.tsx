import { useEffect, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BaseColor } from "../../config/color";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { TbArrowsDownUp } from "react-icons/tb";

const NavBarFilter = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const orderByValue = searchParams.get("orderBy");
  const [search, setSearch] = useState<string>(
    searchValue === null ? "" : searchValue.toString()
  );
  const [order, setOrder] = useState<string | null>(orderByValue);
  const flag: boolean = useLocation().pathname.includes("favorites");

  useEffect(() => {
    if (searchParams.get("search") === null) {
      setSearch("");
    }
  }, [searchParams]);

  const handleChangeOrder = () => {
    if (searchValue === null) {
      setOrder("asc");
    } else if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
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
          <Section>
            <SearchBar
              placeholder="search..."
              type="text"
              value={search}
              name="search"
              onChange={(text) => setSearch(text.target.value)}
            />
            <Button>Search</Button>
          </Section>
          <Section style={{ justifyContent: "flex-end" }}>
            <OrderText>Order by</OrderText>
            <OrderButton
              name="orderBy"
              value={order === null ? "" : order}
              onClick={handleChangeOrder}
            >
              {orderByValue === null ? (
                <TbArrowsDownUp />
              ) : order === "asc" ? (
                <HiArrowUp />
              ) : (
                <HiArrowDown />
              )}
              Year
            </OrderButton>
          </Section>
        </SearchForm>
      </Container>
      <Outlet />
    </>
  );
};

export default NavBarFilter;

const Container = styled("div")`
  display: grid;
  grid-template-columns: 2fr 4fr;
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
  display: grid;
  grid-template-columns: 2fr 4fr;
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
