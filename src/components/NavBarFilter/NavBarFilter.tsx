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
  const orderByYearValue = searchParams.get("orderByYear");
  const orderBySaleDateValue = searchParams.get("orderBySaleDate");
  const [search, setSearch] = useState<string>(
    searchValue === null ? "" : searchValue.toString()
  );
  const flag: boolean = useLocation().pathname.includes("favorites");

  useEffect(() => {
    if (searchParams.get("search") === null) {
      setSearch("");
    }
  }, [searchParams]);

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
            <OrderBy
              orderValue={orderByYearValue}
              name={"orderByYear"}
              text={"Year"}
            />
            <OrderBy
              orderValue={orderBySaleDateValue}
              name={"orderBySaleDate"}
              text={"Sale Date"}
            />
          </Section>
        </SearchForm>
      </Container>
      <Outlet />
    </>
  );
};

interface Props {
  orderValue: string | null;
  name: string;
  text: string;
}

const OrderBy = (props: Props) => {
  const [order, setOrder] = useState<string | null>(props.orderValue);

  const handleChangeOrder = () => {
    if (props.orderValue === null) {
      setOrder("asc");
    } else if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  return (
    <>
      <OrderButton
        name={props.name}
        value={order === null ? "" : order}
        onClick={handleChangeOrder}
      >
        {props.orderValue === null ? (
          <TbArrowsDownUp />
        ) : order === "asc" ? (
          <HiArrowUp />
        ) : (
          <HiArrowDown />
        )}
        {props.text}
      </OrderButton>
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
  width: 100px;
  height: 25px;
`;

const OrderText = styled("p")`
  margin: 0;
  font-size: 12px;
  color: ${BaseColor.lightBluePrimaryColor};
`;
