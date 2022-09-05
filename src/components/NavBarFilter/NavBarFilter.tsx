import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"
import { BaseColor } from "../../config/color"
import Button from "../Button/Button"
import { useLocation } from 'react-router-dom'
interface Option {
    value: string,
    name: string
}
const NavBarFilter = () => {
    const flag: boolean = (useLocation().pathname.includes('favorites'));

    const select: Option[] = [
        { value: 'year', name: 'year' }
    ]
    return (
        <>
            <Container>
                <Section>
                    {
                        !flag ?
                            <Link to={'cars/create'}>
                                <Button>
                                    Create
                                </Button>
                                </Link>
                            : null
                    }
                </Section>
                <Section style={{ justifyContent: 'flex-end' }}>
                    <SearchBar placeholder="search..." />
                    <Button>
                        Search
                    </Button>
                </Section >
                <Section style={{ justifyContent: 'flex-end' }}>
                    <SelectOptions>
                        {
                            select.map((item: Option, index: number) => {
                                return (
                                    <Options value={item.value} key={index}>{item.name} </Options>
                                )
                            })
                        }
                    </SelectOptions>
                </Section>
            </Container>
            <Outlet />
        </>
    )
}

export default NavBarFilter

const Container = styled('div')`
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
    grid-gap: 20px;
    padding-inline: 20px;
    background-color: ${BaseColor.blackSecondaryColor};
    position: fixed;
    margin-top: 65px;
    width: 96%;
    height: 45px;
`

const Section = styled('div')`
    display: flex;
    align-items: center;
`

const SearchBar = styled('input')`
    height: 25px;
`
const SelectOptions = styled('select')`
    width: 100xpx;
`
const Options = styled('option')`

`