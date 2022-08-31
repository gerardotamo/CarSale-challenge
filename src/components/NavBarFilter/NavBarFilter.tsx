import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { BaseColor } from "../../config/color"
import Button from "../Button/Button"

interface Option {
    value: string,
    name: string
}
const NavBarFilter = () => {

    const select: Option[] = [
        { value: 'year', name: 'year' }
    ]

    return (
        <>
            <Container>
                <Section>
                    <Button>
                        Create
                    </Button>
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
    padding-top: 15px;
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